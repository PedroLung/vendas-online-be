import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from 'src/user/enum/user-type.enum';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from 'src/auth/dto/loginPayload.dto';

interface RequestWithHeaders {
  headers: {
    authorization?: string;
  };
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithHeaders>();
    const authorization = request.headers.authorization;

    if (!authorization) {
      return false;
    }

    const token: string = authorization.replace('Bearer ', '').trim();

    if (!token) {
      return false;
    }

    try {
      const loginPayload = await this.jwtService.verifyAsync<LoginPayload>(
        token,
        { secret: process.env.JWT_SECRET || '' },
      );

      if (!loginPayload || !loginPayload.typeUser) {
        return false;
      }

      const userType = loginPayload.typeUser as UserType;

      return requiredRoles.some((role) => role === userType);
    } catch (error) {
      console.error('Erro ao validar token:', error);
      return false;
    }
  }
}

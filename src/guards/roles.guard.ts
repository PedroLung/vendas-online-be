/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { LoginPayload } from 'src/auth/dto/loginPayload.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { authorization } = context.switchToHttp().getRequest().headers;

    if (!authorization) {
      return false;
    }

    const token = authorization.replace('Bearer ', '').trim();

    const loginPayload: LoginPayload | undefined = await this.jwtService
      .verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })
      .catch(() => undefined);

    if (!loginPayload) {
      return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    return requiredRoles.some((role) => role === loginPayload.typeUser);
  }
}

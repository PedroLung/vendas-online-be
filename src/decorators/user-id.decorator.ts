import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { LoginPayload } from 'src/auth/dto/loginPayload.dto';

declare module 'express' {
  interface Request {
    user?: LoginPayload;
  }
}

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Usuario não encontrado na requisição');
    }

    return user.id;
  },
);

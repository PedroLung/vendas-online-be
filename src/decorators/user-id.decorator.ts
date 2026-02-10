/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { authorizationToLoginPayload } from 'src/utils/base-64-converter';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { authorization } = ctx.switchToHttp().getRequest().headers;

    const loginPayLoad = authorizationToLoginPayload(authorization);

    console.log('Authorization: ', authorization);

    return loginPayLoad?.id;
  },
);

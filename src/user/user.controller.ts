import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  // eslint-disable-next-line @typescript-eslint/require-await
  async getAllUsers() {
    return JSON.stringify({ test: 'abc' });
  }
}

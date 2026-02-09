import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entity/user.entity';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async login(loginDto: LoginDto): Promise<UserEntity> {
    const user: UserEntity | undefined = await this.userService.getUserByEmail(
      loginDto.email,
    );

    const isMatch = await compare(loginDto.password, user?.password);

    if (!user || !isMatch) {
      throw new NotFoundException(`Email ou senha inválidos`);
    }

    return user;
  }
}

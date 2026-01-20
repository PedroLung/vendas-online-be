/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { User } from './interface/user.interface';
import { CreateUserDto } from './dto/createUser.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = [];

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const passwordHashed = await hash(createUserDto.password, saltOrRounds);

    const user: User = {
      ...createUserDto,
      id: this.users.length + 1,
      password: passwordHashed,
    };

    this.users.push(user);

    return user;
  }
}

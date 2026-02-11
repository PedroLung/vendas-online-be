import { UserEntity } from 'src/user/entity/user.entity';
import { UserType } from 'src/user/enum/user-type.enum';

export class LoginPayload {
  id: number;
  typeUser: UserType;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.typeUser = user.typeUser;
  }
}

import { User } from '@src/models/users/user.model';
import { ICreateUserRepository } from '@src/repositories/interfaces/users/create-user.interface.repository';
import { ICreateUserService } from '@src/services/interfaces/users/create-users.interface.service';

export class CreateUserService implements ICreateUserService<User> {
  constructor(private readonly repository: ICreateUserRepository<User>) {}
  async execute(payload: User): Promise<any> {
    const result = await this.repository.create(payload);
    return result.data;
  }
}

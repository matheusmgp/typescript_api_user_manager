import { User } from '@src/models/users/user.model';
import { ICreateUserRepository } from '@src/repositories/interfaces/users/create-user.interface.repository';
import { ICreateUserService } from '@src/services/interfaces/users/create-users.interface.service';
import { inject, injectable } from 'tsyringe';

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}
@injectable()
export class CreateUserService implements ICreateUserService<User> {
  constructor(
    @inject('CreateUserMongoDbRepository')
    private readonly repository: ICreateUserRepository<User>
  ) {}
  async execute(payload: CreateUserRequest): Promise<any> {
    const result = await this.repository.create(payload);
    return result.data;
  }
}

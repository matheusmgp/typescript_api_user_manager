import { ResultModel } from '@src/models/result.list.model';
import { User } from '@src/models/users/user.model';
import { ICreateUserRepository } from '@src/repositories/interfaces/users/create-user.interface.repository';
import { AuthService } from '@src/services/auth.service';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}
export class CreateUserInMemoryRepository implements ICreateUserRepository<User> {
  private users: User[] = [];
  async create(payload: CreateUserData): Promise<ResultModel<User>> {
    console.log('CreateUserInMemoryRepository');

    const user = {
      name: payload.name,
      email: payload.email,
      password: await AuthService.hashPassword(payload.password),
    };

    this.users.push(user);

    const result: ResultModel<User> = {
      data: user,
    };
    return result;
  }
}

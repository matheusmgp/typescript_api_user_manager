import { ResultModel } from '@src/models/result.list.model';
import { User } from '@src/models/users/user.model';
import { ICreateUserRepository } from '@src/repositories/interfaces/users/create-user.interface.repository';

export class CreateUserRepository implements ICreateUserRepository<User> {
  async create(payload: User): Promise<ResultModel<User>> {
    const user = new User(payload);
    const saved = await user.save();

    const result: ResultModel<User> = {
      data: saved,
    };
    return result;
  }
}

import { ResultModel } from '@src/models/result.list.model';
import { User } from '@src/models/users/user.model';
import { IUpdateUserRepository } from '@src/repositories/interfaces/users/update-user.interface.repository';

export interface UpdateUserData {
  name: string;
  email: string;
  password: string;
}
export class UpdateUserMongoDbRepository implements IUpdateUserRepository<User> {
  async update(id: string, payload: UpdateUserData): Promise<ResultModel<User | {}>> {
    const result: ResultModel<User | {}> = {
      data: (await User.findByIdAndUpdate(id, payload)) ?? {},
    };
    return result;
  }
}

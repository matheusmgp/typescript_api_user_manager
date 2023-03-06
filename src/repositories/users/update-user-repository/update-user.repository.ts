import { ResultModel } from '@src/models/result.list.model';
import { User } from '@src/models/users/user.model';
import { IUpdateUserRepository } from '@src/repositories/interfaces/users/update-user.interface.repository';

export interface UpdateUserData {
  name: string;
  email: string;
  password: string;
}
export class UpdateUserRepository implements IUpdateUserRepository<User> {
  async update(id: string, payload: UpdateUserData): Promise<ResultModel<User>> {
    const updated = await User.findByIdAndUpdate(id, payload);
    const result: ResultModel<User> = {
      data: updated,
    };
    return result;
  }
}

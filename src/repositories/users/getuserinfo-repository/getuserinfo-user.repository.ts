import { ResultModel } from '@src/models/result.list.model';
import { User } from '@src/models/users/user.model';
import { IGetUserInfoRepository } from '@src/repositories/interfaces/users/getuserinfo-user.interface.repository';

export class GetUserInfoRepository implements IGetUserInfoRepository<User> {
  async getById(id: string): Promise<ResultModel<User>> {
    const result: ResultModel<User> = {
      data: await User.findOne({ _id: id }),
    };

    return result;
  }
}

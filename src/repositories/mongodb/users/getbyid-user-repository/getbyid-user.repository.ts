import { ResultModel } from '@src/models/result.list.model';
import { User } from '@src/models/users/user.model';
import { IGetByIdUserRepository } from '@src/repositories/interfaces/users/getbyid-user.interface.repository';

export class GetByIdUsersMongoDbRepository implements IGetByIdUserRepository<User> {
  async getById(id: string): Promise<ResultModel<User>> {
    const result: ResultModel<User> = {
      data: await User.findOne({ _id: id }),
    };

    return result;
  }
  async findOneByEmail(prop: string): Promise<ResultModel<User>> {
    const result: ResultModel<User> = {
      data: await User.findOne({ email: prop }),
    };
    return result;
  }
}

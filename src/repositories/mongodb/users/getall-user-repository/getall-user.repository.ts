import { IPagination } from '@src/models/pagination/pagination.model';
import { ResultListModel } from '@src/models/result.list.model';
import { User } from '@src/models/users/user.model';
import { IGetAllUserRepository } from '@src/repositories/interfaces/users/getall-user.interface.repository';

export class GetAllUsersMongoDbRepository implements IGetAllUserRepository<User> {
  async getAll({ skip, limit, filter }: IPagination): Promise<ResultListModel<User>> {
    let findQuery: any;

    if (filter) {
      findQuery = User.find({ name: { $regex: '.*' + filter + '.*' } });
    } else {
      findQuery = User.find({});
      findQuery.sort({ _id: 1 }).skip(skip);
      findQuery.limit(limit);
    }

    const result: ResultListModel<User> = {
      data: await findQuery,
      count: await this.count(),
    };

    return result;
  }

  async count(): Promise<number> {
    return await User.find().count();
  }
}

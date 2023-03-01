import { IPagination } from '@src/models/pagination/pagination.model';
import { ResultListModel, ResultModel } from '@src/models/result.list.model';
import { User } from '@src/models/users/user.model';
import { IUserRepository } from '../interfaces/user.interface.repository';

export class UsersRepository implements IUserRepository<User> {
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

  async create(payload: User): Promise<ResultModel<User>> {
    const user = new User(payload);
    const saved = await user.save();

    const result: ResultModel<User> = {
      data: saved,
    };
    return result;
  }
  async update(id: string, payload: User): Promise<ResultModel<User>> {
    const updated = await User.findByIdAndUpdate(id, payload);
    const result: ResultModel<User> = {
      data: updated,
    };
    return result;
  }
  async count(): Promise<number> {
    return await User.find().count();
  }
}

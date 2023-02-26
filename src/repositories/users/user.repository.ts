import { IPagination } from '@src/models/pagination/pagination.model';
import { ResultListModel, ResultModel } from '@src/models/result.list.model';
import { User } from '@src/models/users/user.model';

const getAll = async ({ skip, limit, filter }: IPagination): Promise<ResultListModel> => {
  let findQuery: any;

  if (filter) {
    findQuery = User.find({ name: { $regex: '.*' + filter + '.*' } });
  } else {
    findQuery = User.find({});
    findQuery.sort({ _id: 1 }).skip(skip);
    findQuery.limit(limit);
  }

  const result: ResultListModel = {
    results: await findQuery,
    count: await count(),
  };

  return result;
};

const getById = async (id: string): Promise<any> => {
  return await User.findOne({ _id: id });
};

const findOneByEmail = async (prop: string): Promise<any> => {
  return await User.findOne({ email: prop });
};

const create = async (payload: User): Promise<ResultModel> => {
  const user = new User(payload);
  const result = await user.save();

  return { result };
};

const update = async (id: string, payload: User): Promise<ResultModel> => {
  const result = await User.findByIdAndUpdate(id, payload);
  return { result };
};

const count = async (): Promise<number> => {
  return User.find().count();
};

export const UserRepository = {
  getAll,
  create,
  getById,
  update,
  findOneByEmail,
};

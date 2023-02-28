import { IPagination } from '@src/models/pagination/pagination.model';
import { ResultListModel, ResultModel } from '@src/models/result.list.model';
import { User } from '@src/models/users/user.model';
import { HelperService } from '@src/util/helpers/is-valid-object-id';

const getAll = async ({ skip, limit, filter }: IPagination): Promise<ResultListModel<User>> => {
  let findQuery: any;

  if (filter) {
    findQuery = User.find({ name: { $regex: '.*' + filter + '.*' } });
  } else {
    findQuery = User.find({});
    findQuery.sort({ _id: 1 }).skip(skip);
    findQuery.limit(limit);
  }

  const result: ResultListModel<User> = {
    results: await findQuery,
    count: await count(),
  };

  return result;
};

const getById = async (id: string): Promise<any> => {
  if (!HelperService.checkIfObjectIdIsValid(id)) {
    throw Error('ID inválida.');
  }

  return await User.findOne({ _id: id });
};

const findOneByEmail = async (prop: string): Promise<any> => {
  return await User.findOne({ email: prop });
};

const create = async (payload: User): Promise<ResultModel<User>> => {
  const user = new User(payload);
  const result = await user.save();

  return { result };
};

const update = async (id: string, payload: User): Promise<ResultModel<any>> => {
  if (!HelperService.checkIfObjectIdIsValid(id)) throw Error('ID inválida.');
  const result = await User.findByIdAndUpdate(id, payload);
  return { result };
};

const count = async (): Promise<number> => {
  return await User.find().count();
};

export const UserRepository = {
  getAll,
  create,
  getById,
  update,
  findOneByEmail,
};

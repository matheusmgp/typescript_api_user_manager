import { IPagination } from '@src/models/pagination/pagination.model';
import { User } from '@src/models/users/user.model';

const create = async (payload: User): Promise<User> => {
  const user = new User(payload);
  return await user.save();
};

const getAll = async ({ skip, limit, filter }: IPagination): Promise<User[] | undefined> => {
  const findQuery = User.find({ name: { $regex: '.*' + filter + '.*' } })
    .sort({ _id: 1 })
    .skip(skip);

  if (limit) {
    findQuery.limit(limit);
  }
  const results = await findQuery;
  return results;
};

const getById = async (id: string): Promise<User | null> => {
  return await User.findOne({ _id: id });
};

export const UserRepository = {
  getAll,
  create,
  getById,
};

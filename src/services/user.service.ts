import { User } from '@src/models/users/user.model';
import { UserRepository } from '@src/repositories/users/user.repository';
import { IPagination } from '@src/models/pagination/pagination.model';

const create = async (payload: User): Promise<User> => {
  return await UserRepository.create(payload);
};

const getAll = async (pagination: IPagination): Promise<User[] | undefined> => {
  return await UserRepository.getAll(pagination);
};

const getById = async (id: string): Promise<User | null> => {
  return await UserRepository.getById(id);
};

export const UserService = {
  getAll,
  create,
  getById,
};

import { User } from '@src/models/users/user.model';
import { UserRepository } from '@src/repositories/users/user.repository';
import { IPagination } from '@src/models/pagination/pagination.model';
import { ResultListModel, ResultModel } from '@src/models/result.list.model';
import { AuthService } from './auth.service';

const create = async (payload: User): Promise<ResultModel> => {
  return await UserRepository.create(payload);
};
const update = async (id: string, payload: User): Promise<ResultModel> => {
  const found = await UserRepository.getById(id);
  if (!found) {
    throw new Error(`ID ${id} not found`);
  }
  payload.password = await AuthService.hashPassword(payload.password);
  return await UserRepository.update(id, payload);
};

const getAll = async (pagination: IPagination): Promise<ResultListModel> => {
  return await UserRepository.getAll(pagination);
};

const getById = async (id: string): Promise<any> => {
  return await UserRepository.getById(id);
};

const findOneByEmail = async (email: string): Promise<any> => {
  return await UserRepository.findOneByEmail(email);
};

export const UserService = {
  getAll,
  create,
  getById,
  update,
  findOneByEmail,
};

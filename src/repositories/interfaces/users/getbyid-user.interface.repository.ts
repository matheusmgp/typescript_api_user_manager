import { ResultModel } from '@src/models/result.list.model';

export interface IGetByIdUserRepository<T> {
  getById(id: string): Promise<ResultModel<T | {}>>;
  findOneByEmail(email: string): Promise<ResultModel<T | {}>>;
}

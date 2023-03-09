import { ResultModel } from '@src/models/result.list.model';

export interface ICreateUserRepository<T> {
  create(payload: T): Promise<ResultModel<T | {}>>;
}

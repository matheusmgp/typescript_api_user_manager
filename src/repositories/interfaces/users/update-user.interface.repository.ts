import { ResultModel } from '@src/models/result.list.model';

export interface IUpdateUserRepository<T> {
  update(id: string, payload: T): Promise<ResultModel<T | {}>>;
}

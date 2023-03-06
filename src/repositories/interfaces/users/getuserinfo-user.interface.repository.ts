import { ResultModel } from '@src/models/result.list.model';

export interface IGetUserInfoRepository<T> {
  getById(id: string): Promise<ResultModel<T>>;
}

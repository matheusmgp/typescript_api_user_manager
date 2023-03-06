import { ResultModel } from '@src/models/result.list.model';

export interface IGetUserInfoService<T> {
  execute(id: string): Promise<ResultModel<T>>;
}

import { ResultModel } from '@src/models/result.list.model';

export interface IGetByIdUserService<T> {
  execute(id: string): Promise<ResultModel<T>>;
}

import { IPagination } from '@src/models/pagination/pagination.model';
import { ResultListModel, ResultModel } from '@src/models/result.list.model';

export interface IBaseRepository<T> {
  getAll(pagination: IPagination): Promise<ResultListModel<T>>;
  getById(id: string): Promise<ResultModel<T>>;
  create(payload: T): Promise<ResultModel<T>>;
  update(id: string, payload: T): Promise<ResultModel<T>>;
}

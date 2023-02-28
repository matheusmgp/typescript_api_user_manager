import { IPagination } from '@src/models/pagination/pagination.model';
import { ResultListModel } from '@src/models/result.list.model';

export interface IBaseService<T> {
  getAll(pagination: IPagination): Promise<ResultListModel<T>>;
  getById(id: string): Promise<T>;
  create(payload: T): Promise<T>;
  update(id: string, payload: T): Promise<T>;
}

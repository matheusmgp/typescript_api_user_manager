import { IPagination } from '@src/models/pagination/pagination.model';
import { ResultListModel } from '@src/models/result.list.model';

export interface IGetAllUserRepository<T> {
  getAll(pagination: IPagination): Promise<ResultListModel<T>>;
}

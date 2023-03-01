import { IPagination } from '@src/models/pagination/pagination.model';
import { ResultListModel } from '@src/models/result.list.model';

export interface IGetAllUsersService<T> {
  execute(pagination: IPagination): Promise<ResultListModel<T>>;
}

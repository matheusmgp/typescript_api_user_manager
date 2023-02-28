import { ResultModel } from '@src/models/result.list.model';
import { IBaseRepository } from './base.interface.repository';

export interface IUserRepository<IUser> extends IBaseRepository<IUser> {
  findOneByEmail(id: string): Promise<ResultModel<IUser>>;
}

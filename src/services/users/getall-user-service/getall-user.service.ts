import { IPagination } from '@src/models/pagination/pagination.model';
import { ResultListModel } from '@src/models/result.list.model';
import { User } from '@src/models/users/user.model';
import { IGetAllUserRepository } from '@src/repositories/interfaces/users/getall-user.interface.repository';
import { IGetAllUsersService } from '@src/services/interfaces/users/getall-users.interface.service';

export class GetAllUsersService implements IGetAllUsersService<User> {
  constructor(private readonly repository: IGetAllUserRepository<User>) {}
  async execute(pagination: IPagination): Promise<ResultListModel<User>> {
    return await this.repository.getAll(pagination);
  }
}

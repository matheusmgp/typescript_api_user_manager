import { IPagination } from '@src/models/pagination/pagination.model';
import { ResultListModel } from '@src/models/result.list.model';
import { User } from '@src/models/users/user.model';
import { IUserRepository } from '@src/repositories/interfaces/user.interface.repository';
import { IGetAllUsersService } from '@src/services/interfaces/getall-users.interface.service';

export class GetAllUsersService implements IGetAllUsersService<User> {
  constructor(private readonly repository: IUserRepository<User>) {}
  async execute(pagination: IPagination): Promise<ResultListModel<User>> {
    return await this.repository.getAll(pagination);
  }
}

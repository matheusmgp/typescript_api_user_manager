import { IPagination } from '@src/models/pagination/pagination.model';
import { ResultListModel } from '@src/models/result.list.model';
import { User } from '@src/models/users/user.model';
import { IGetAllUsersService } from '@src/services/interfaces/users/getall-users.interface.service';

export class GetAllUsersController {
  constructor(private readonly userService: IGetAllUsersService<User>) {}
  public async handleRequest({ skip, limit, filter }: IPagination): Promise<ResultListModel<User>> {
    const pagination: IPagination = {
      skip: Number(skip),
      limit: Number(limit),
      filter: filter as string,
    };
    const resp = await this.userService.execute(pagination);
    return resp;
  }
}

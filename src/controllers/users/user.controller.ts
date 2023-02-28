import { IPagination } from '@src/models/pagination/pagination.model';
import { ResultListModel, ResultModel } from '@src/models/result.list.model';
import { User } from '@src/models/users/user.model';
import { IUserService } from '@src/services/interfaces/user.interface.service';

export class UserController {
  constructor(private readonly userService: IUserService<User>) {}
  public async getAll({ skip, limit, filter }: IPagination): Promise<ResultListModel<User>> {
    const pagination: IPagination = {
      skip: Number(skip),
      limit: Number(limit),
      filter: filter as string,
    };

    return await this.userService.getAll(pagination);
  }

  public async getById(id: string): Promise<ResultModel<User>> {
    const data = await this.userService.getById(id);

    return { data };
  }

  public async create(body: User): Promise<ResultModel<User>> {
    const data = await this.userService.create(body);
    return { data };
  }

  public async update(id: string, body: User): Promise<ResultModel<User>> {
    const data = await this.userService.update(id, body);
    return { data };
  }
}

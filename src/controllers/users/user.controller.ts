import { IPagination } from '@src/models/pagination/pagination.model';
import { ResultListModel, ResultModel } from '@src/models/result.list.model';
import { User } from '@src/models/users/user.model';
import { IUserService } from '@src/services/interfaces/user.interface.service';
import { UserEmailValidationError } from '@src/util/errors/email-already-exists-error';
import { BaseController } from '../base.controller';

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
    let data: any;
    try {
      const user = new User(body);
      data = await this.userService.create(user);
    } catch (error: any) {
      const err = BaseController.sendCreateUpdateErrorResponse(error);
      throw new UserEmailValidationError(err);
    }
    return { data };
  }

  public async update(id: string, body: User): Promise<ResultModel<User>> {
    const data = await this.userService.update(id, body);
    return { data };
  }
}

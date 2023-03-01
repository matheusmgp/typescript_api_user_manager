import { ResultModel } from '@src/models/result.list.model';
import { User } from '@src/models/users/user.model';
import { IGetByIdUserService } from '@src/services/interfaces/getbyid-users.interface.service';

export class GetByIdUserController {
  constructor(private readonly userService: IGetByIdUserService<User>) {}

  public async handleRequest(id: string): Promise<ResultModel<User>> {
    const data = await this.userService.execute(id);

    return data;
  }
}

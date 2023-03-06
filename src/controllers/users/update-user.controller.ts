import { ResultModel } from '@src/models/result.list.model';
import { User } from '@src/models/users/user.model';
import { UpdateUserRequest } from '@src/services';
import { IUpdateUserService } from '@src/services/interfaces/users/update-users.interface.service';

export class UpdateUserController {
  constructor(private readonly userService: IUpdateUserService<User>) {}

  public async handleRequest(id: string, body: UpdateUserRequest): Promise<ResultModel<User>> {
    const data = await this.userService.execute(id, body);
    return { data };
  }
}

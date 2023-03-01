import { ResultModel } from '@src/models/result.list.model';
import { User } from '@src/models/users/user.model';
import { ICreateUserService } from '@src/services/interfaces/users/create-users.interface.service';
import { UserEmailValidationError } from '@src/util/errors/email-already-exists-error';
import { BaseController } from '../base.controller';

export class CreateUserController {
  constructor(private readonly userService: ICreateUserService<User>) {}

  public async handleRequest(body: User): Promise<ResultModel<User>> {
    let data: any;
    try {
      data = await this.userService.execute(body);
    } catch (error: any) {
      const err = BaseController.sendCreateUpdateErrorResponse(error);
      throw new UserEmailValidationError(err);
    }
    return { data };
  }
}

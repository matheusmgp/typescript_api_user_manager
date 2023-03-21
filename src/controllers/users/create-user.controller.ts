import { ResultModel } from '@src/models/result.list.model';
import { User } from '@src/models/users/user.model';
import { CreateUserRequest } from '@src/services';
import { ICreateUserService } from '@src/services/interfaces/users/create-users.interface.service';
import { UserEmailValidationError } from '@src/util/errors/email-already-exists-error';
import { inject, injectable } from 'tsyringe';
import { HttpResponseService } from '../http-response';

@injectable()
export class CreateUserController {
  constructor(
    @inject('CreateUserService')
    private readonly userService: ICreateUserService<User>
  ) {}

  public async handleRequest(body: CreateUserRequest): Promise<ResultModel<User>> {
    let data: any;
    try {
      data = await this.userService.execute(body);
    } catch (error: any) {
      const err = HttpResponseService.sendCreateUpdateErrorResponse(error);
      throw new UserEmailValidationError(err);
    }
    return { data };
  }
}

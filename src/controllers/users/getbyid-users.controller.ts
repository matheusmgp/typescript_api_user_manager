import { ResultModel } from '@src/models/result.list.model';
import { User } from '@src/models/users/user.model';
import { IGetByIdUserService } from '@src/services/interfaces/users/getbyid-users.interface.service';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetByIdUserController {
  constructor(
    @inject('GetByIdUserService')
    private readonly userService: IGetByIdUserService<User>
  ) {}

  public async handleRequest(id: string): Promise<ResultModel<User>> {
    const data = await this.userService.execute(id);

    return data;
  }
}

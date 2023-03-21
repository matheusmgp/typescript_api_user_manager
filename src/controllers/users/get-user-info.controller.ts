import { ResultModel } from '@src/models/result.list.model';
import { User } from '@src/models/users/user.model';
import { IGetUserInfoService } from '@src/services/interfaces/users/getuserinfo.interface.service';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetUserInfoController {
  constructor(
    @inject('GetUserInfoService')
    private readonly userService: IGetUserInfoService<User>
  ) {}

  public async handleRequest(id: string): Promise<ResultModel<User>> {
    const data = await this.userService.execute(id);

    return data;
  }
}

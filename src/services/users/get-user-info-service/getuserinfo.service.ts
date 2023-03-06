import { User } from '@src/models/users/user.model';
import { IGetUserInfoRepository } from '@src/repositories/interfaces/users/getuserinfo-user.interface.repository';
import { IGetUserInfoService } from '@src/services/interfaces/users/getuserinfo.interface.service';
import { IdNotFoundError } from '@src/util/errors/id-not-found-error';
import { IdNotValidError } from '@src/util/errors/id-not-valid-error';
import { HelperService } from '@src/util/helpers/is-valid-object-id';

export class GetUserInfoService implements IGetUserInfoService<User> {
  constructor(private readonly repository: IGetUserInfoRepository<User>) {}

  async execute(id: string): Promise<any> {
    if (!HelperService.checkIfObjectIdIsValid(id)) {
      throw new IdNotValidError(id);
    }
    const result = await this.repository.getById(id);

    console.log(result.data);
    if (!result.data) {
      throw new IdNotFoundError(id);
    }
    return result.data;
  }
}

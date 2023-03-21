import { User } from '@src/models/users/user.model';
import { IGetUserInfoRepository } from '@src/repositories/interfaces/users/getuserinfo-user.interface.repository';
import { IGetUserInfoService } from '@src/services/interfaces/users/getuserinfo.interface.service';
import { IdNotFoundError } from '@src/util/errors/id-not-found-error';
import { IdNotValidError } from '@src/util/errors/id-not-valid-error';
import { HelperService } from '@src/util/helpers/is-valid-object-id';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetUserInfoService implements IGetUserInfoService<User> {
  constructor(
    @inject('GetUserInfoMongoDbRepository')
    private readonly repository: IGetUserInfoRepository<User>
  ) {}

  async execute(id: string): Promise<any> {
    if (!HelperService.checkIfObjectIdIsValid(id)) {
      throw new IdNotValidError(id);
    }
    const result = await this.repository.getById(id);

    if (Object.keys(result.data).length === 0) {
      throw new IdNotFoundError(id);
    }
    return result.data;
  }
}

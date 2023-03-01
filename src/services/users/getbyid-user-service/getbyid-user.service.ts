import { User } from '@src/models/users/user.model';
import { IUserRepository } from '@src/repositories/interfaces/user.interface.repository';
import { IGetByIdUserService } from '@src/services/interfaces/getbyid-users.interface.service';
import { IdNotFoundError } from '@src/util/errors/id-not-found-error';
import { IdNotValidError } from '@src/util/errors/id-not-valid-error';
import { HelperService } from '@src/util/helpers/is-valid-object-id';

export class GetByIdUserService implements IGetByIdUserService<User> {
  constructor(private readonly repository: IUserRepository<User>) {}

  async execute(id: string): Promise<any> {
    if (!HelperService.checkIfObjectIdIsValid(id)) {
      throw new IdNotValidError(id);
    }
    const result = await this.repository.getById(id);
    if (!result.data) {
      throw new IdNotFoundError(id);
    }
    return result.data;
  }
}

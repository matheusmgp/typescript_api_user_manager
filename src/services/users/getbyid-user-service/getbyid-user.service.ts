import { User } from '@src/models/users/user.model';
import { IGetByIdUserRepository } from '@src/repositories/interfaces/users/getbyid-user.interface.repository';
import { IGetByIdUserService } from '@src/services/interfaces/users/getbyid-users.interface.service';
import { IdNotFoundError } from '@src/util/errors/id-not-found-error';
import { IdNotValidError } from '@src/util/errors/id-not-valid-error';
import { HelperService } from '@src/util/helpers/is-valid-object-id';

export class GetByIdUserService implements IGetByIdUserService<User> {
  constructor(private readonly repository: IGetByIdUserRepository<User>) {}

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

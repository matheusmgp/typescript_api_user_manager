import { User } from '@src/models/users/user.model';
import { IGetByIdUserRepository } from '@src/repositories/interfaces/users/getbyid-user.interface.repository';
import { IUpdateUserRepository } from '@src/repositories/interfaces/users/update-user.interface.repository';
import { AuthService } from '@src/services/auth.service';
import { IUpdateUserService } from '@src/services/interfaces/users/update-users.interface.service';
import { UserEmailValidationError } from '@src/util/errors/email-already-exists-error';
import { IdNotFoundError } from '@src/util/errors/id-not-found-error';
import { IdNotValidError } from '@src/util/errors/id-not-valid-error';
import { HelperService } from '@src/util/helpers/is-valid-object-id';

export class UpdateUserService implements IUpdateUserService<User> {
  constructor(
    private readonly repository: IUpdateUserRepository<User>,
    private readonly getbyidRepository: IGetByIdUserRepository<User>
  ) {}
  async execute(id: string, payload: User): Promise<any> {
    if (!HelperService.checkIfObjectIdIsValid(id)) {
      throw new IdNotValidError(id);
    }

    const found = await this.getbyidRepository.getById(id);
    if (!found.data) {
      throw new IdNotFoundError(id);
    }

    const exists = await this.getbyidRepository.findOneByEmail(payload.email);

    if (exists.data) {
      if (id != exists.data._id) {
        throw new UserEmailValidationError('');
      }
    }

    payload.password = await AuthService.hashPassword(payload.password);
    const result = await this.repository.update(id, payload);
    return result.data;
  }
}

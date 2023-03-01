import { User } from '@src/models/users/user.model';
import { IUserRepository } from '@src/repositories/interfaces/user.interface.repository';
import { AuthService } from '@src/services/auth.service';
import { IUpdateUserService } from '@src/services/interfaces/update-users.interface.service';
import { UserEmailValidationError } from '@src/util/errors/email-already-exists-error';
import { IdNotFoundError } from '@src/util/errors/id-not-found-error';
import { IdNotValidError } from '@src/util/errors/id-not-valid-error';
import { HelperService } from '@src/util/helpers/is-valid-object-id';

export class UpdateUserService implements IUpdateUserService<User> {
  constructor(private readonly repository: IUserRepository<User>) {}
  async execute(id: string, payload: User): Promise<any> {
    if (!HelperService.checkIfObjectIdIsValid(id)) {
      throw new IdNotValidError(id);
    }

    const found = await this.repository.getById(id);
    if (!found.data) {
      throw new IdNotFoundError(id);
    }

    const exists = await this.repository.findOneByEmail(payload.email);

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

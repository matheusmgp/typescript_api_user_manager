import { User } from '@src/models/users/user.model';
import { IGetByIdUserRepository } from '@src/repositories/interfaces/users/getbyid-user.interface.repository';
import { IUpdateUserRepository } from '@src/repositories/interfaces/users/update-user.interface.repository';
import { AuthService } from '@src/services/auth.service';
import { IUpdateUserService } from '@src/services/interfaces/users/update-users.interface.service';
import { UserEmailValidationError } from '@src/util/errors/email-already-exists-error';
import { IdNotFoundError } from '@src/util/errors/id-not-found-error';
import { IdNotValidError } from '@src/util/errors/id-not-valid-error';
import { HelperService } from '@src/util/helpers/is-valid-object-id';
import { inject, injectable } from 'tsyringe';

export interface UpdateUserRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
export class UpdateUserService implements IUpdateUserService<User> {
  constructor(
    @inject('UpdateUserMongoDbRepository')
    private readonly repository: IUpdateUserRepository<User>,
    @inject('GetByIdUsersMongoDbRepository')
    private readonly getbyidRepository: IGetByIdUserRepository<User>
  ) {}
  async execute(id: string, payload: UpdateUserRequest): Promise<any> {
    if (!HelperService.checkIfObjectIdIsValid(id)) {
      throw new IdNotValidError(id);
    }

    const found = await this.getbyidRepository.getById(id);
    if (Object.keys(found.data).length === 0) {
      throw new IdNotFoundError(id);
    }

    const exists = await this.getbyidRepository.findOneByEmail(payload.email);

    if (exists.data instanceof User) {
      if (exists.data) {
        if (id != exists.data._id) {
          throw new UserEmailValidationError('');
        }
      }
    }

    payload.password = await AuthService.hashPassword(payload.password);
    const result = await this.repository.update(id, payload);
    return result.data;
  }
}

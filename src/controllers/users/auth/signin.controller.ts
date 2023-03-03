import { User } from '@src/models/users/user.model';
import { GetByIdUsersRepository } from '@src/repositories/users/getbyid-user-repository/getbyid-user.repository';
import { AuthService } from '@src/services/auth.service';
import { PasswordDoesNotMatchError } from '@src/util/errors/password-does-not-match.error';
import { UserNotFoundError } from '@src/util/errors/user-not-found.errorr';

export interface SignInResponse {
  data: {
    user: User;
    token: string;
  };
}
export class SignInController {
  constructor(private readonly repository: GetByIdUsersRepository) {}
  public async signIn(id: string, body: any): Promise<SignInResponse> {
    const { email, password } = body;
    let user: any;
    let token = '';
    try {
      user = await this.repository.findOneByEmail(email);

      if (!user.data) {
        throw new UserNotFoundError('');
      }
      if (!(await AuthService.comparePassword(password, user.data.password))) {
        throw new PasswordDoesNotMatchError('');
      }

      token = AuthService.generateToken(JSON.parse(JSON.stringify(user.data)));
    } catch (error: any) {
      if (error instanceof UserNotFoundError) {
        throw new UserNotFoundError('');
      } else if (error instanceof PasswordDoesNotMatchError) {
        throw new PasswordDoesNotMatchError('');
      }
    }

    return {
      data: {
        user: user.data,
        token,
      },
    };
  }
}

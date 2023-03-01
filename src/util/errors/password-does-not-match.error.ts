import { InternalError } from './internal-error';

export class PasswordDoesNotMatchError extends InternalError {
  constructor(message: string) {
    const internalMessage = 'Password does not match!';

    super(`${internalMessage}`, 404);
  }
}

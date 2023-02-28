import { InternalError } from './internal-error';

export class UserEmailValidationError extends InternalError {
  constructor(message: string) {
    const internalMessage = 'User validation failed: email: already exists in database';

    super(`${internalMessage}`, 409);
  }
}

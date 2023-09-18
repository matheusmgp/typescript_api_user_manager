import { InternalError } from './internal-error';

export class UserNotFoundError extends InternalError {
  constructor(message: string) {
    const internalMessage = 'User not found!';

    super(`${internalMessage}`, 404);
  }
}

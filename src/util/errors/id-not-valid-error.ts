import { InternalError } from './internal-error';

export class IdNotValidError extends InternalError {
  constructor(id: string) {
    const internalMessage = `ID ${id} is not a valid mongo ObjectId .`;

    super(`${internalMessage}`, 409);
  }
}

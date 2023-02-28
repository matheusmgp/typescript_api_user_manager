import { InternalError } from './internal-error';

export class IdNotFoundError extends InternalError {
  constructor(id: string) {
    const internalMessage = `ID ${id} does not exists in the database.`;

    super(`${internalMessage}`);
  }
}

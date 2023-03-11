import { Types } from 'mongoose';

/**
 * Função que checa se o ID recebido é do formato ObjectId do mongoose
 */
const checkIfObjectIdIsValid = (id: string) => {
  if (Types.ObjectId.isValid(id)) {
    if (String(new Types.ObjectId(id)) === id) return true;
    return false;
  }
  return false;
};

export const HelperService = {
  checkIfObjectIdIsValid,
};

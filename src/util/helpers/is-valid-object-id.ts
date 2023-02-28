import { Types } from 'mongoose';

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

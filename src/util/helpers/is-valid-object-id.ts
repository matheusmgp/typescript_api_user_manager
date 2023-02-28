import { Types } from 'mongoose';

const checkIfObjectIdIsValid = (id: string) => {
  const result = Types.ObjectId.isValid(id);

  return result;
};

export const HelperService = {
  checkIfObjectIdIsValid,
};

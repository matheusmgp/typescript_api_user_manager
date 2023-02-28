import { Types } from 'mongoose';

const checkIfObjectIdIsValid = (id: string) => {
  const result = Types.ObjectId.isValid(id);
  console.log('result', result);
  return result;
};

export const HelperService = {
  checkIfObjectIdIsValid,
};

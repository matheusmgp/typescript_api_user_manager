import { User } from '@src/models/users/user.model';

const create = async (payload: User): Promise<User> => {
  let result: User = {
    name: '',
    email: '',
    password: '',
  };
  try {
    const user = new User(payload);
    result = await user.save();
  } catch (error: any) {
    console.log(error);
  }
  return result;
};

const get = async (): Promise<User[] | undefined> => {
  let result: User[] = [];
  try {
    result = await User.find({});
  } catch (error: any) {
    console.log(error);
  }
  return result;
};

export const UserService = {
  get,
  create,
};

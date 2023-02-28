import { IParams } from '@src/models/pagination/pagination.model';
import { User } from '@src/models/users/user.model';
import { object, string, Schema } from 'yup';

export const userCreateSchema: Schema<User> = object({
  name: string().required().min(5).max(20),
  email: string().email().required(),
  password: string().required().min(8).max(8),
});

export const userUpdateSchema: Schema<User> = object({
  name: string().required().min(5).max(20),
  email: string().email().required(),
  password: string().required().min(8).max(8),
});

export const userParamsSchema: Schema<IParams> = object({
  id: string().required(),
});

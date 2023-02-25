import { IPagination, IParams } from '@src/models/pagination/pagination.model';
import { User } from '@src/models/users/user.model';
import { object, string, number, Schema } from 'yup';

export const userCreateSchema: Schema<User> = object({
  name: string().required().min(5),
  email: string().email().required(),
  password: string().required().min(8).max(8),
});

export const userQuerySchema: Schema<IPagination> = object({
  skip: string().required(),
  limit: string().required(),
});

export const userParamsSchema: Schema<IParams> = object({
  id: number().required(),
});

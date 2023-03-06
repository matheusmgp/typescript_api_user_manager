import { IParams } from '@src/models/pagination/pagination.model';
import { CreateUserRequest, UpdateUserRequest } from '@src/services';
import { object, string, Schema } from 'yup';

export const userCreateSchema: Schema<CreateUserRequest> = object({
  name: string().required().min(5).max(20),
  email: string().email().required(),
  password: string().required().min(8).max(8),
});

export const userUpdateSchema: Schema<UpdateUserRequest> = object({
  name: string().required().min(5).max(50),
  email: string().email().required(),
  password: string().required().min(8).max(8),
});

export const userParamsSchema: Schema<IParams> = object({
  id: string().required(),
});

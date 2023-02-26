import { IPagination } from '@src/models/pagination/pagination.model';
import { number, object, Schema, string } from 'yup';

export const paginationSchema: Schema<IPagination> = object({
  skip: number().required(),
  limit: number().required(),
  filter: string().required(),
});

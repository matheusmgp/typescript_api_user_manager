import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema } from 'yup';

type TProperty = 'body' | 'header' | 'params' | 'query';

type TAllSchemas = Record<TProperty, Schema<any>>;

type TValidation = (schemas: Partial<TAllSchemas>) => RequestHandler;

export const validation: TValidation = (schemas) => async (req, res, next) => {
  const errorsResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as TProperty], { abortEarly: false });
    } catch (err: any) {
      const errors = err.errors;
      errorsResult[key] = { errors: errors };
    }
  });

  if (Object.entries(errorsResult).length === 0) {
    next();
  } else {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ code: 422, validation: errorsResult });
  }
};

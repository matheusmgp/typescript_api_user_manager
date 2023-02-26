import { Response } from 'express';
import mongoose, { Error } from 'mongoose';

const sendCreateUpdateErrorResponse = (res: Response, error: mongoose.Error.ValidationError | Error): void => {
  if (error instanceof mongoose.Error.ValidationError) {
    const clientErrors = handleClientErrors(error);
    res.status(clientErrors.code).send(clientErrors);
  } else {
    res.status(500).send({ code: 500, error: 'Internal Server Error' });
  }
};

const handleClientErrors = (error: mongoose.Error.ValidationError): { code: number; error: string } => {
  const duplicatedKindErrors = Object.values(error.errors).filter((err) => err.kind === 'DUPLICATED');
  if (duplicatedKindErrors.length) {
    return { code: 409, error: error.message };
  }
  return { code: 422, error: error.message };
};

const httpResponse = (data: any, method: string, res: Response, statusCode: number) => {
  res.status(statusCode).send({
    code: statusCode,
    data,
    timestamp: new Date().toISOString(),
    method,
  });
};

const httpExceptionResponse = (error: any, method: string, res: Response, statusCode: number) => {
  res.status(statusCode).send({
    code: statusCode,
    error,
    timestamp: new Date().toISOString(),
    method,
  });
};

const httpResponseList = (data: any, method: string, res: Response, statusCode: number) => {
  res.status(statusCode).send({
    code: statusCode,
    data: data.results,
    timestamp: new Date().toISOString(),
    method,
    count: data.count,
  });
};

export const BaseController = {
  sendCreateUpdateErrorResponse,
  handleClientErrors,
  httpResponse,
  httpResponseList,
  httpExceptionResponse,
};

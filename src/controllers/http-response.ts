import { Response } from 'express';
import mongoose, { Error } from 'mongoose';

export class HttpResponse {
  constructor(statusCode: number, result: any, method: string) {
    this.data = result;
    this.method = method;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
  }
  statusCode: number;
  data: any;
  timestamp: string;
  method: string;
}
export class HttpExceptionResponse {
  constructor(statusCode: number, error: any, method: string) {
    this.error = error;
    this.method = method;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
  }
  statusCode: number;
  error: any;
  timestamp: string;
  method: string;
}
export class HttpListResponse extends HttpResponse {
  constructor(statusCode: number, result: any, method: string, count: number) {
    super(statusCode, result, method);
    this.count = count;
  }
  count: number;
}

/**
 * Função que retorna uma exception
 */
const sendCreateUpdateErrorResponse = (error: mongoose.Error.ValidationError | Error): any => {
  if (error instanceof mongoose.Error.ValidationError) {
    const clientErrors = handleClientErrors(error);
    // res.status(clientErrors.code).send(clientErrors);

    return clientErrors;
  } else {
    //res.status(500).send({ code: 500, error: 'Internal Server Error' });
    return { code: 500, error: 'Internal Server Error' };
  }
};

/**
 * Função que checa erro de duplicated do mongoose
 */
const handleClientErrors = (error: mongoose.Error.ValidationError): { code: number; error: string } => {
  const duplicatedKindErrors = Object.values(error.errors).filter((err) => err.kind === 'DUPLICATED');
  if (duplicatedKindErrors.length) {
    return { code: 409, error: error.message };
  }
  return { code: 422, error: error.message };
};

/**
 * Função que retorna uma http response de sucesso
 */
const httpResponse = (data: any, method: string, res: Response, statusCode: number) => {
  res.status(statusCode).send(new HttpResponse(statusCode, data, method));
};

/**
 * Função que retorna uma http response de exception
 */
const httpExceptionResponse = (error: any, method: string, res: Response, statusCode: number) => {
  res.status(statusCode).send(new HttpExceptionResponse(statusCode, error, method));
};

/**
 * Função que retorna uma http response de sucesso em array
 */
const httpResponseList = (data: any, method: string, res: Response, statusCode: number) => {
  res.status(statusCode).send(new HttpListResponse(statusCode, data.results, method, data.count));
};

export const HttpResponseService = {
  sendCreateUpdateErrorResponse,
  handleClientErrors,
  httpResponse,
  httpResponseList,
  httpExceptionResponse,
};

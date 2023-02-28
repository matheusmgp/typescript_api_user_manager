import { BaseController } from '@src/controllers/base.controller';
import { paginationSchema } from '@src/controllers/validations/pagination/pagination.validation';
import { userCreateSchema, userParamsSchema } from '@src/controllers/validations/users/user.validation';
import { validation } from '@src/shared/middleware';
import { AuthMiddleware } from '@src/shared/middleware/auth.middleware';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { resolveDependencies } from '../../../config/dependency.resolver';
export class UserRoutes {
  public router: Router;

  private paginationValidation = validation({ query: paginationSchema });
  private createValidation = validation({ body: userCreateSchema });
  private paramsValidation = validation({ params: userParamsSchema });

  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  protected registerRoutes(): void {
    this.router.get('/user', AuthMiddleware, this.paginationValidation, this.getAll);

    this.router.get('/user/:id', AuthMiddleware, this.paramsValidation, this.getById);

    this.router.post('/user', AuthMiddleware, this.createValidation, this.create);

    this.router.patch('/user/:id', AuthMiddleware, this.update);
  }

  private async getAll(req: Request, res: Response): Promise<void> {
    const pagination: any = {
      skip: req.query.skip,
      limit: req.query.limit,
      filter: req.query.filter,
    };

    let result: any;
    try {
      result = await resolveDependencies().userController.getAll(pagination);
      if (result) {
        BaseController.httpResponse(result, 'get', res, StatusCodes.OK);
      } else {
        BaseController.httpResponse(result, 'get', res, StatusCodes.NOT_FOUND);
      }
    } catch (err: any) {
      BaseController.httpExceptionResponse(err.message, 'get', res, StatusCodes.BAD_REQUEST);
    }
  }
  private async getById(req: Request, res: Response): Promise<void> {
    let result: any;
    try {
      result = await resolveDependencies().userController.getById(req.params.id);
      console.log('result.', result);
      if (result) {
        BaseController.httpResponse(result.data, 'get', res, StatusCodes.OK);
      } else {
        BaseController.httpResponse(result.data, 'get', res, StatusCodes.NOT_FOUND);
      }
    } catch (err: any) {
      BaseController.httpExceptionResponse(err.message, 'get', res, StatusCodes.BAD_REQUEST);
    }
  }
  private async create(req: Request, res: Response): Promise<void> {
    let result: any;
    try {
      result = await resolveDependencies().userController.create(req.body);
      BaseController.httpResponse(result.data, 'post', res, StatusCodes.CREATED);
    } catch (error: any) {
      BaseController.sendCreateUpdateErrorResponse(res, error);
    }
  }
  private async update(req: Request, res: Response): Promise<void> {
    let result: any;
    try {
      result = await resolveDependencies().userController.update(req.params.id, req.body);
      BaseController.httpResponse(result.data, 'post', res, StatusCodes.OK);
    } catch (err: any) {
      BaseController.httpExceptionResponse(err.message, 'patch', res, StatusCodes.BAD_REQUEST);
    }
  }
}

import { BaseController } from '@src/controllers/base.controller';
import { paginationSchema } from '@src/controllers/validations/pagination/pagination.validation';
import {
  userCreateSchema,
  userParamsSchema,
  userUpdateSchema,
} from '@src/controllers/validations/users/user.validation';
import { validation } from '@src/shared/middleware';
import { AuthMiddleware } from '@src/shared/middleware/auth.middleware';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { resolveUsersDependencies } from '../../../config/dependency.resolver';
export class UserRoutes {
  public router: Router;

  private paginationValidation = validation({ query: paginationSchema });
  private createValidation = validation({ body: userCreateSchema });
  private paramsValidation = validation({ params: userParamsSchema });
  private updateValidation = validation({ body: userUpdateSchema });
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  protected registerRoutes(): void {
    this.router.get('/user/getAll', /*AuthMiddleware,*/ this.paginationValidation, this.getAll2);

    this.router.get('/user', /*AuthMiddleware,*/ this.paginationValidation, this.getAll);

    this.router.get('/user/:id', /*AuthMiddleware,*/ this.paramsValidation, this.getById);

    this.router.get('/user/getbyid/:id', /*AuthMiddleware,*/ this.paramsValidation, this.getById2);

    this.router.post('/user', /*AuthMiddleware,*/ this.createValidation, this.create);

    this.router.post('/user/create', /*AuthMiddleware,*/ this.createValidation, this.create2);

    this.router.patch('/user/:id', /*AuthMiddleware,*/ this.updateValidation, this.paramsValidation, this.update);

    this.router.patch(
      '/user/update/:id',
      /*AuthMiddleware,*/ this.updateValidation,
      this.paramsValidation,
      this.update2
    );
  }

  private async getAll(req: Request, res: Response): Promise<void> {
    const pagination: any = {
      skip: req.query.skip,
      limit: req.query.limit,
      filter: req.query.filter,
    };

    let result: any;
    try {
      result = await resolveUsersDependencies().userController.getAll(pagination);
      if (result) {
        BaseController.httpResponse(result.data, 'get', res, StatusCodes.OK);
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
      result = await resolveUsersDependencies().userController.getById(req.params.id);

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
      result = await resolveUsersDependencies().userController.create(req.body);

      BaseController.httpResponse(result.data, 'post', res, StatusCodes.CREATED);
    } catch (err: any) {
      BaseController.httpExceptionResponse(err.message, 'post', res, err.code);
    }
  }
  private async update(req: Request, res: Response): Promise<void> {
    let result: any;
    try {
      result = await resolveUsersDependencies().userController.update(req.params.id, req.body);
      BaseController.httpResponse(result.data, 'patch', res, StatusCodes.OK);
    } catch (err: any) {
      BaseController.httpExceptionResponse(err.message, 'patch', res, err.code);
    }
  }

  //em teste
  private async getAll2(req: Request, res: Response): Promise<void> {
    const pagination: any = {
      skip: req.query.skip,
      limit: req.query.limit,
      filter: req.query.filter,
    };

    let result: any;
    try {
      result = await resolveUsersDependencies().getallUsersController.handleRequest(pagination);
      if (result) {
        BaseController.httpResponse(result.data, 'get', res, StatusCodes.OK);
      } else {
        BaseController.httpResponse(result, 'get', res, StatusCodes.NOT_FOUND);
      }
    } catch (err: any) {
      BaseController.httpExceptionResponse(err.message, 'get', res, StatusCodes.BAD_REQUEST);
    }
  }
  private async getById2(req: Request, res: Response): Promise<void> {
    let result: any;
    try {
      result = await resolveUsersDependencies().getByIdUserController.handleRequest(req.params.id);
      console.log('result,result', result);
      if (result) {
        BaseController.httpResponse(result, 'get', res, StatusCodes.OK);
      } else {
        BaseController.httpResponse(result, 'get', res, StatusCodes.NOT_FOUND);
      }
    } catch (err: any) {
      BaseController.httpExceptionResponse(err.message, 'get', res, StatusCodes.BAD_REQUEST);
    }
  }
  private async create2(req: Request, res: Response): Promise<void> {
    let result: any;
    try {
      result = await resolveUsersDependencies().createUserController.handleRequest(req.body);

      BaseController.httpResponse(result.data, 'post', res, StatusCodes.CREATED);
    } catch (err: any) {
      BaseController.httpExceptionResponse(err.message, 'post', res, err.code);
    }
  }
  private async update2(req: Request, res: Response): Promise<void> {
    let result: any;
    try {
      result = await resolveUsersDependencies().updateUserController.handleRequest(req.params.id, req.body);
      BaseController.httpResponse(result.data, 'patch', res, StatusCodes.OK);
    } catch (err: any) {
      BaseController.httpExceptionResponse(err.message, 'patch', res, err.code);
    }
  }
}

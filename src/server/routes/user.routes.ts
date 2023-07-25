import { HttpResponseService } from '@src/controllers/http-response';
import { CreateUserController } from '@src/controllers/users/create-user.controller';
import { GetUserInfoController } from '@src/controllers/users/get-user-info.controller';
import { GetAllUsersController } from '@src/controllers/users/getall-users.controller';
import { GetByIdUserController } from '@src/controllers/users/getbyid-users.controller';
import { UpdateUserController } from '@src/controllers/users/update-user.controller';
import { paginationSchema } from '@src/controllers/validations/pagination/pagination.validation';
import {
  userCreateSchema,
  userParamsSchema,
  userUpdateSchema,
} from '@src/controllers/validations/users/user.validation';
import { validation } from '@src/shared/middleware';
import { AuthMiddleware } from '@src/shared/middleware/auth.middleware';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';

export class UserRoutes {
  public router: Router;

  private paginationValidation = validation({ query: paginationSchema });
  private createValidation = validation({ body: userCreateSchema });
  private paramsValidation = validation({ params: userParamsSchema });
  private updateValidation = validation({ body: userUpdateSchema });

  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  protected registerRoutes(): void {
    this.router.get('/user', AuthMiddleware, this.paginationValidation, this.getAll);
    this.router.get('/user/:id', AuthMiddleware, this.paramsValidation, this.getById);
    this.router.get('/user/info/logged', AuthMiddleware, this.getUserInfo);
    this.router.post('/user', AuthMiddleware, this.createValidation, this.create);
    this.router.patch('/user/:id', AuthMiddleware, this.updateValidation, this.paramsValidation, this.update);
  }

  private async getAll(req: Request, res: Response): Promise<void> {
    const pagination: any = {
      skip: req.query.skip,
      limit: req.query.limit,
      filter: req.query.filter,
    };

    let result: any;
    const controller = container.resolve(GetAllUsersController);
    try {
      result = await controller.handleRequest(pagination);
      if (result) {
        HttpResponseService.httpResponse(result.data, 'get', res, StatusCodes.OK);
      } else {
        HttpResponseService.httpResponse(result, 'get', res, StatusCodes.NOT_FOUND);
      }
    } catch (err: any) {
      HttpResponseService.httpExceptionResponse(err.message, 'get', res, err.code);
    }
  }
  private async getById(req: Request, res: Response): Promise<void> {
    let result: any;
    const controller = container.resolve(GetByIdUserController);
    try {
      result = await controller.handleRequest(req.params.id);

      if (result) {
        HttpResponseService.httpResponse(result, 'get', res, StatusCodes.OK);
      } else {
        HttpResponseService.httpResponse(result, 'get', res, StatusCodes.NOT_FOUND);
      }
    } catch (err: any) {
      HttpResponseService.httpExceptionResponse(err.message, 'get', res, err.code);
    }
  }
  private async getUserInfo(req: Request, res: Response): Promise<void> {
    let result: any;
    const controller = container.resolve(GetUserInfoController);
    try {
      if (req.decoded?.id) {
        result = await controller.handleRequest(req.decoded.id);
      } else {
        HttpResponseService.httpResponse(result, 'get', res, StatusCodes.NOT_FOUND);
      }

      if (result) {
        HttpResponseService.httpResponse(result, 'get', res, StatusCodes.OK);
      } else {
        HttpResponseService.httpResponse(result, 'get', res, StatusCodes.NOT_FOUND);
      }
    } catch (err: any) {
      HttpResponseService.httpExceptionResponse(err.message, 'get', res, err.code);
    }
  }
  private async create(req: Request, res: Response): Promise<void> {
    let result: any;
    const controller = container.resolve(CreateUserController);
    try {
      result = await controller.handleRequest(req.body);

      HttpResponseService.httpResponse(result.data, 'post', res, StatusCodes.CREATED);
    } catch (err: any) {
      HttpResponseService.httpExceptionResponse(err.message, 'post', res, err.code);
    }
  }
  private async update(req: Request, res: Response): Promise<void> {
    let result: any;
    const controller = container.resolve(UpdateUserController);
    try {
      result = await controller.handleRequest(req.params.id, req.body);
      HttpResponseService.httpResponse(result.data, 'patch', res, StatusCodes.OK);
    } catch (err: any) {
      HttpResponseService.httpExceptionResponse(err.message, 'patch', res, err.code);
    }
  }
}

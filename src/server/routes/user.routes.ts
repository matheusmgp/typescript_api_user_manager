import { BaseController } from '@src/controllers/base.controller';
import { UserController } from '@src/controllers/users/user.controller';
import { paginationSchema } from '@src/controllers/validations/pagination/pagination.validation';
import { userCreateSchema, userParamsSchema } from '@src/controllers/validations/users/user.validation';
import { IPagination } from '@src/models/pagination/pagination.model';
import { validation } from '@src/shared/middleware';
import { AuthMiddleware } from '@src/shared/middleware/auth.middleware';
import express, { Router } from 'express';
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
    this.router.get('/user', AuthMiddleware, this.paginationValidation, async (req, res) => {
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
    });

    this.router.get('/user/:id', AuthMiddleware, this.paramsValidation, async (req, res) => {
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
    });

    this.router.post('/user', AuthMiddleware, this.createValidation, async (req, res) => {
      let result: any;
      try {
        result = await resolveDependencies().userController.create(req.body);
        BaseController.httpResponse(result.data, 'post', res, StatusCodes.CREATED);
      } catch (error: any) {
        BaseController.sendCreateUpdateErrorResponse(res, error);
      }
    });

    this.router.patch('/user/:id', AuthMiddleware, async (req, res) => {
      let result: any;
      try {
        result = await resolveDependencies().userController.update(req.params.id, req.body);
        BaseController.httpResponse(result.data, 'post', res, StatusCodes.OK);
      } catch (err: any) {
        BaseController.httpExceptionResponse(err.message, 'patch', res, StatusCodes.BAD_REQUEST);
      }
    });
  }
}

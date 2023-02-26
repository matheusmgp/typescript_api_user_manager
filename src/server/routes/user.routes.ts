import { UserController } from '@src/controllers/users/user.controller';
import { paginationSchema } from '@src/controllers/validations/pagination/pagination.validation';
import { userCreateSchema, userParamsSchema } from '@src/controllers/validations/users/user.validation';
import { validation } from '@src/shared/middleware';
import { AuthMiddleware } from '@src/shared/middleware/auth.middleware';
import express, { Router } from 'express';

export class UserRoutes {
  public router: Router;
  private controller: UserController = new UserController();

  private paginationValidation = validation({ query: paginationSchema });
  private createValidation = validation({ body: userCreateSchema });
  private paramsValidation = validation({ params: userParamsSchema });

  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  protected registerRoutes(): void {
    this.router.get('/user', AuthMiddleware, this.paginationValidation, this.controller.getAll);
    this.router.get('/user/:id', AuthMiddleware, this.paramsValidation, this.controller.getById);
    this.router.post('/user', AuthMiddleware, this.createValidation, this.controller.create);
  }
}

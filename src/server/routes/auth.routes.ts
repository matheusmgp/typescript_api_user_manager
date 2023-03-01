import { HttpResponseService } from '@src/controllers/http-response';
import { resolveUsersDependencies } from '../../../config/dependency.resolver';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

export class AuthRoutes {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  protected registerRoutes(): void {
    this.router.post('/signin', this.signin);
  }

  private async signin(req: Request, res: Response): Promise<void> {
    let result: any;
    try {
      result = await resolveUsersDependencies().siginController.singIn(req.params.id, req.body);

      HttpResponseService.httpResponse(result.data, 'post', res, StatusCodes.OK);
    } catch (err: any) {
      HttpResponseService.httpExceptionResponse(err.message, 'post', res, err.code);
    }
  }
}

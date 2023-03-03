import { HttpResponseService } from '@src/controllers/http-response';
import { resolveSignInDependencies } from '../../../config/dependency.resolver';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

export class AuthRoutes {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  protected registerRoutes(): void {
    this.router.post('/signin', this.signIn);
  }

  private async signIn(req: Request, res: Response): Promise<void> {
    let result: any;
    try {
      result = await resolveSignInDependencies().siginController.signIn(req.params.id, req.body);

      HttpResponseService.httpResponse(result.data, 'post', res, StatusCodes.OK);
    } catch (err: any) {
      HttpResponseService.httpExceptionResponse(err.message, 'post', res, err.code);
    }
  }
}

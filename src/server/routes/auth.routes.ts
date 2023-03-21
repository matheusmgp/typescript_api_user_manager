import { HttpResponseService } from '@src/controllers/http-response';
import { SignInController } from '@src/controllers/users/auth/signin.controller';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';

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
    const controller = container.resolve(SignInController);
    try {
      result = await controller.signIn(req.params.id, req.body);

      HttpResponseService.httpResponse(result.data, 'post', res, StatusCodes.OK);
    } catch (err: any) {
      HttpResponseService.httpExceptionResponse(err.message, 'post', res, err.code);
    }
  }
}

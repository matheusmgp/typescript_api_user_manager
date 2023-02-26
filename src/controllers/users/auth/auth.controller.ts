import { BaseController } from '@src/controllers/base.controller';
import { UserService } from '@src/services';
import { AuthService } from '@src/services/auth.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class AuthController {
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const user = await UserService.findOneByEmail(email);

    if (!user) {
      return BaseController.httpExceptionResponse('User not found!', 'post', res, StatusCodes.UNAUTHORIZED);
    }
    if (!(await AuthService.comparePassword(password, user.password))) {
      return BaseController.httpExceptionResponse('Password does not match!', 'post', res, StatusCodes.UNAUTHORIZED);
    }
    const token = AuthService.generateToken(user.toJSON());

    BaseController.httpResponse({ ...user.toJSON(), ...{ token } }, 'get', res, StatusCodes.OK);
  }
}

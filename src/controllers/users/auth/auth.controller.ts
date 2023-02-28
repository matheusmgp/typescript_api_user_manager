import { BaseController } from '@src/controllers/base.controller';
import { UsersRepository } from '@src/repositories/users/users.repository';
import { UsersRService } from '@src/services';

import { AuthService } from '@src/services/auth.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class AuthController {
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const service = new UsersRService(new UsersRepository());
    const user = await service.findOneByEmail(email);

    if (!user.data) {
      return BaseController.httpExceptionResponse('User not found!', 'post', res, StatusCodes.UNAUTHORIZED);
    }
    if (!(await AuthService.comparePassword(password, user.data.password))) {
      return BaseController.httpExceptionResponse('Password does not match!', 'post', res, StatusCodes.UNAUTHORIZED);
    }
    const token = AuthService.generateToken(user.data.toJSON());

    BaseController.httpResponse({ ...user.data.toJSON(), ...{ token } }, 'post', res, StatusCodes.OK);
  }
}

import { User } from '@src/models/users/user.model';
import { AuthService } from '@src/services/auth.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class AuthController {
  public async login(req: Request, res: Response): Promise<Response | undefined> {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        code: 401,
        error: 'User not found!',
      });
    }
    if (!(await AuthService.comparePassword(password, user.password))) {
      return res.status(401).send({ code: 401, error: 'Password does not match!' });
    }
    const token = AuthService.generateToken(user.toJSON());

    console.log('token', token);

    return res.send({ ...user.toJSON(), ...{ token } });
  }
}

import { User } from '@src/models/users/user.model';
import { UserService } from '@src/services';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class UserController {
  constructor() {}

  public async get(_: Request, res: Response): Promise<void> {
    const result = await UserService.get();
    res.status(StatusCodes.OK).json(result);
  }
  public async getById(req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.OK).json(req.params);
  }

  public async create(req: Request<{}, {}, User>, res: Response): Promise<void> {
    const response = await UserService.create(req.body);
    res.status(StatusCodes.CREATED).json(response);
  }
}

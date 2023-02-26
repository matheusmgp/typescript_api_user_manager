import { IPagination } from '@src/models/pagination/pagination.model';
import { User } from '@src/models/users/user.model';
import { UserService } from '@src/services';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController } from '../base.controller';

export class UserController {
  public async getAll(req: Request, res: Response): Promise<void> {
    const pagination: IPagination = {
      skip: Number(req.query.skip),
      limit: Number(req.query.limit),
      filter: req.query.filter as string,
    };

    const result = await UserService.getAll(pagination);
    res.status(StatusCodes.OK).json(result);
  }

  public async getById(req: Request, res: Response): Promise<void> {
    const result = await UserService.getById(req.params.id);
    if (result) {
      res.status(StatusCodes.OK).json(result);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'no record found' });
    }
  }

  public async create(req: Request<{}, {}, User>, res: Response): Promise<void> {
    try {
      const response = await UserService.create(req.body);
      res.status(StatusCodes.CREATED).json(response);
    } catch (error: any) {
      BaseController.sendCreateUpdateErrorResponse(res, error);
    }
  }
}

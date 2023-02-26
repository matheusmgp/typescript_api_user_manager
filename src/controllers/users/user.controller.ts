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
    if (result) {
      BaseController.httpResponseList(result, 'get', res, StatusCodes.OK);
    } else {
      BaseController.httpResponse(result, 'get', res, StatusCodes.OK);
    }
  }

  public async getById(req: Request, res: Response): Promise<void> {
    const result = await UserService.getById(req.params.id);
    if (result) {
      BaseController.httpResponse(result, 'get', res, StatusCodes.OK);
    } else {
      BaseController.httpResponse(result, 'get', res, StatusCodes.NOT_FOUND);
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

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const response = await UserService.update(req.params.id, req.body);
      res.status(StatusCodes.OK).json(response);
    } catch (error: any) {
      BaseController.sendCreateUpdateErrorResponse(res, error);
    }
  }
}

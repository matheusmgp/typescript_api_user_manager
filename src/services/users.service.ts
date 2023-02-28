import { IPagination } from '@src/models/pagination/pagination.model';
import { ResultListModel } from '@src/models/result.list.model';
import { User } from '@src/models/users/user.model';
import { IUserRepository } from '@src/repositories/interfaces/user.interface.repository';
import { AuthService } from './auth.service';
import { IUserService } from './interfaces/user.interface.service';

export class UsersRService implements IUserService<User> {
  constructor(private readonly repository: IUserRepository<User>) {}
  async getAll(pagination: IPagination): Promise<ResultListModel<User>> {
    return await this.repository.getAll(pagination);
  }
  async getById(id: string): Promise<any> {
    const result = await this.repository.getById(id);
    return result.data;
  }
  async findOneByEmail(prop: string): Promise<any> {
    return await this.repository.findOneByEmail(prop);
  }

  async create(payload: User): Promise<any> {
    const user = new User(payload);
    const result = await this.repository.create(user);

    return result.data;
  }
  async update(id: string, payload: User): Promise<any> {
    const found = await this.repository.getById(id);
    if (!found) {
      throw new Error(`ID ${id} not found`);
    }
    payload.password = await AuthService.hashPassword(payload.password);
    const result = await this.repository.update(id, payload);
    return result.data;
  }
}

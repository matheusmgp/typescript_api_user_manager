import { UserController } from '../src/controllers/users/user.controller';
import { UsersRService } from '../src/services/users.service';
import { UsersRepository } from '../src/repositories/users/users.repository';

export const resolveUsersDependencies = () => {
  const userController = new UserController(new UsersRService(new UsersRepository()));

  return { userController };
};

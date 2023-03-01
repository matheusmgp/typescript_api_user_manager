import { UserController } from '../src/controllers/users/user.controller';
import { UsersRService } from '../src/services/users.service';
import { UsersRepository } from '../src/repositories/users/users.repository';
import { GetAllUsersController } from '@src/controllers/users/getall-users.controller';
import { GetAllUsersService } from '@src/services/users/getall-user-service/getall-user.service';
import { GetByIdUserController } from '@src/controllers/users/getbyid-users.controller';
import { GetByIdUserService } from '@src/services/users/getbyid-user-service/getbyid-user.service';
import { CreateUserController } from '@src/controllers/users/create-user.controller';
import { CreateUserService } from '@src/services/users/create-user-service/create-user.service';
import { UpdateUserController } from '@src/controllers/users/update-user.controller';
import { UpdateUserService } from '@src/services/users/update-user-service/update-user.service';

export const resolveUsersDependencies = () => {
  const userController = new UserController(new UsersRService(new UsersRepository()));
  const getallUsersController = new GetAllUsersController(new GetAllUsersService(new UsersRepository()));
  const getByIdUserController = new GetByIdUserController(new GetByIdUserService(new UsersRepository()));
  const createUserController = new CreateUserController(new CreateUserService(new UsersRepository()));
  const updateUserController = new UpdateUserController(new UpdateUserService(new UsersRepository()));

  return { userController, getallUsersController, getByIdUserController, createUserController, updateUserController };
};

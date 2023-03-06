import { GetAllUsersController } from '@src/controllers/users/getall-users.controller';
import { GetAllUsersService } from '@src/services/users/getall-user-service/getall-user.service';
import { GetByIdUserController } from '@src/controllers/users/getbyid-users.controller';
import { GetByIdUserService } from '@src/services/users/getbyid-user-service/getbyid-user.service';
import { CreateUserController } from '@src/controllers/users/create-user.controller';
import { CreateUserService } from '@src/services/users/create-user-service/create-user.service';
import { UpdateUserController } from '@src/controllers/users/update-user.controller';
import { UpdateUserService } from '@src/services/users/update-user-service/update-user.service';
import { GetAllUsersRepository } from '@src/repositories/users/getall-user-repository/getall-user.repository';
import { GetByIdUsersRepository } from '@src/repositories/users/getbyid-user-repository/getbyid-user.repository';
import { CreateUserRepository } from '@src/repositories/users/create-user-repository/create-user.repository';
import { UpdateUserRepository } from '@src/repositories/users/update-user-repository/update-user.repository';
import { SignInController } from '@src/controllers/users/auth/signin.controller';
import { GetUserInfoController } from '@src/controllers/users/get-user-info.controller';
import { GetUserInfoService } from '@src/services/users/get-user-info-service/getuserinfo.service';
import { GetUserInfoRepository } from '@src/repositories/users/getuserinfo-repository/getuserinfo-user.repository';

export const resolveUsersDependencies = () => {
  const getallUsersController = new GetAllUsersController(new GetAllUsersService(new GetAllUsersRepository()));
  const getByIdUserController = new GetByIdUserController(new GetByIdUserService(new GetByIdUsersRepository()));
  const createUserController = new CreateUserController(new CreateUserService(new CreateUserRepository()));
  const updateUserController = new UpdateUserController(
    new UpdateUserService(new UpdateUserRepository(), new GetByIdUsersRepository())
  );
  const getUserInfoController = new GetUserInfoController(new GetUserInfoService(new GetUserInfoRepository()));
  return {
    getallUsersController,
    getByIdUserController,
    createUserController,
    updateUserController,
    getUserInfoController,
  };
};

export const resolveSignInDependencies = () => {
  const siginController = new SignInController(new GetByIdUsersRepository());

  return { siginController };
};

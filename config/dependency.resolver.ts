import { GetAllUsersController } from '@src/controllers/users/getall-users.controller';
import { GetAllUsersService } from '@src/services/users/getall-user-service/getall-user.service';
import { GetByIdUserController } from '@src/controllers/users/getbyid-users.controller';
import { GetByIdUserService } from '@src/services/users/getbyid-user-service/getbyid-user.service';
import { CreateUserController } from '@src/controllers/users/create-user.controller';
import { CreateUserService } from '@src/services/users/create-user-service/create-user.service';
import { UpdateUserController } from '@src/controllers/users/update-user.controller';
import { UpdateUserService } from '@src/services/users/update-user-service/update-user.service';
import { SignInController } from '@src/controllers/users/auth/signin.controller';
import { GetUserInfoController } from '@src/controllers/users/get-user-info.controller';
import { GetUserInfoService } from '@src/services/users/get-user-info-service/getuserinfo.service';
import { GetAllUsersMongoDbRepository } from '@src/repositories/mongodb/users/getall-user-repository/getall-user.repository';
import { GetByIdUsersMongoDbRepository } from '@src/repositories/mongodb/users/getbyid-user-repository/getbyid-user.repository';
import { CreateUserMongoDbRepository } from '@src/repositories/mongodb/users/create-user-repository/create-user.repository';
import { UpdateUserMongoDbRepository } from '@src/repositories/mongodb/users/update-user-repository/update-user.repository';
import { GetUserInfoMongoDbRepository } from '@src/repositories/mongodb/users/getuserinfo-repository/getuserinfo-user.repository';

export const resolveUsersDependencies = () => {
  const getallUsersController = new GetAllUsersController(new GetAllUsersService(new GetAllUsersMongoDbRepository()));
  const getByIdUserController = new GetByIdUserController(new GetByIdUserService(new GetByIdUsersMongoDbRepository()));
  const createUserController = new CreateUserController(new CreateUserService(new CreateUserMongoDbRepository()));
  const updateUserController = new UpdateUserController(
    new UpdateUserService(new UpdateUserMongoDbRepository(), new GetByIdUsersMongoDbRepository())
  );
  const getUserInfoController = new GetUserInfoController(new GetUserInfoService(new GetUserInfoMongoDbRepository()));
  return {
    getallUsersController,
    getByIdUserController,
    createUserController,
    updateUserController,
    getUserInfoController,
  };
};

export const resolveSignInDependencies = () => {
  const siginController = new SignInController(new GetByIdUsersMongoDbRepository());

  return { siginController };
};

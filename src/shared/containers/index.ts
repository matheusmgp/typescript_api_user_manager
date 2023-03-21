import { User } from '@src/models/users/user.model';
import { ICreateUserRepository } from '@src/repositories/interfaces/users/create-user.interface.repository';
import { IGetAllUserRepository } from '@src/repositories/interfaces/users/getall-user.interface.repository';
import { IGetByIdUserRepository } from '@src/repositories/interfaces/users/getbyid-user.interface.repository';
import { IGetUserInfoRepository } from '@src/repositories/interfaces/users/getuserinfo-user.interface.repository';
import { IUpdateUserRepository } from '@src/repositories/interfaces/users/update-user.interface.repository';
import { CreateUserMongoDbRepository } from '@src/repositories/mongodb/users/create-user-repository/create-user.repository';
import { GetAllUsersMongoDbRepository } from '@src/repositories/mongodb/users/getall-user-repository/getall-user.repository';
import { GetByIdUsersMongoDbRepository } from '@src/repositories/mongodb/users/getbyid-user-repository/getbyid-user.repository';
import { GetUserInfoMongoDbRepository } from '@src/repositories/mongodb/users/getuserinfo-repository/getuserinfo-user.repository';
import { UpdateUserMongoDbRepository } from '@src/repositories/mongodb/users/update-user-repository/update-user.repository';
import { CreateUserService, GetAllUsersService, GetByIdUserService, UpdateUserService } from '@src/services';
import { ICreateUserService } from '@src/services/interfaces/users/create-users.interface.service';
import { IGetAllUsersService } from '@src/services/interfaces/users/getall-users.interface.service';
import { IGetByIdUserService } from '@src/services/interfaces/users/getbyid-users.interface.service';
import { IGetUserInfoService } from '@src/services/interfaces/users/getuserinfo.interface.service';
import { IUpdateUserService } from '@src/services/interfaces/users/update-users.interface.service';
import { GetUserInfoService } from '@src/services/users/get-user-info-service/getuserinfo.service';
import { container } from 'tsyringe';
/**
 * REPOSITORIES
 */
container.registerSingleton<ICreateUserRepository<User>>('CreateUserMongoDbRepository', CreateUserMongoDbRepository);

container.registerSingleton<IGetAllUserRepository<User>>('GetAllUsersMongoDbRepository', GetAllUsersMongoDbRepository);

container.registerSingleton<IGetByIdUserRepository<User>>(
  'GetByIdUsersMongoDbRepository',
  GetByIdUsersMongoDbRepository
);

container.registerSingleton<IGetUserInfoRepository<User>>('GetUserInfoMongoDbRepository', GetUserInfoMongoDbRepository);

container.registerSingleton<IUpdateUserRepository<User>>('UpdateUserMongoDbRepository', UpdateUserMongoDbRepository);

/**
 * SERVICES
 */
container.registerSingleton<IGetAllUsersService<User>>('GetAllUsersService', GetAllUsersService);

container.registerSingleton<IGetByIdUserService<User>>('GetByIdUserService', GetByIdUserService);

container.registerSingleton<ICreateUserService<User>>('CreateUserService', CreateUserService);

container.registerSingleton<IUpdateUserService<User>>('UpdateUserService', UpdateUserService);

container.registerSingleton<IGetUserInfoService<User>>('GetUserInfoService', GetUserInfoService);

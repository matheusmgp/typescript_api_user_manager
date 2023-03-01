import { UsersRService } from '@src/services/users.service';
import { UserController } from '../../src/controllers/users/user.controller';
import { UsersRepository } from '@src/repositories/users/users.repository';

jest.mock('@src/services/users.service');
jest.mock('@src/repositories/users/users.repository');

const UserServiceMock = UsersRService as jest.Mock<UsersRService>;
const UserRepositoryMock = UsersRepository as jest.Mock<UsersRepository>;

const sutFactory = () => {
  const userRepositoryMock = new UserRepositoryMock() as jest.Mocked<UsersRepository>;
  const userServiceMock = new UserServiceMock() as jest.Mocked<UsersRService>;
  const userController = new UserController(userServiceMock);

  return {
    userRepositoryMock,
    userServiceMock,
    userController,
  };
};
describe('UserController', () => {
  it('should successfully create a new user with encrypted password', async () => {
    const { userController } = sutFactory();
    const newUser = {
      name: 'Mgp teste',
      email: 'mgp@mgp.com',
      password: '10101010',
    };
    const response = await userController.create(newUser);
    console.log('response', response);
    //expect(response).toEqual(expect.objectContaining({ ...response, method: 'post', statusCode: 200 }));
  });
});

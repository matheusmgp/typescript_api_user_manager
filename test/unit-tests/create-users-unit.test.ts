import { CreateUserController } from '@src/controllers/users/create-user.controller';
import { CreateUserService } from '@src/services';
import { AuthService } from '@src/services/auth.service';
import { CreateUserInMemoryRepository } from '@test/create-user-in-memory.repository';

describe('User unit tests', () => {
  it('should successfully create a new user with encrypted password', async () => {
    const newUser = {
      name: 'Matheus',
      email: 'new-user@e2etest.com',
      password: '10101010',
    };

    const controller = new CreateUserController(new CreateUserService(new CreateUserInMemoryRepository()));

    const response = await controller.handleRequest(newUser);
    console.log('response', response.data);

    if (response?.data?.password) {
      await expect(AuthService.comparePassword(newUser.password, response.data.password)).resolves.toBeTruthy();
    }
    expect(response.data).toEqual(
      expect.objectContaining({
        ...newUser,
        ...{ password: expect.any(String) },
      })
    );
  });
});

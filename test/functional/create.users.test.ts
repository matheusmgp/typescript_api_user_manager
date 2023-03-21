import { User } from '@src/models/users/user.model';
import { AuthService } from '@src/services/auth.service';
import { clearScreenDown } from 'readline';

describe('User e2e tests', () => {
  const defaultUser = {
    name: 'Default User',
    email: 'default@default.com',
    password: '10101010',
  };
  let token: string;

  beforeEach(async () => {
    await User.deleteMany({});
    const user = await new User(defaultUser).save();

    token = AuthService.generateToken(user.toJSON());
  });
  describe('When creating a new user', () => {
    beforeAll(async () => await User.deleteMany({}));
    it('should successfully create a new user with encrypted password', async () => {
      const newUser = {
        name: 'Matheus',
        email: 'jesttest@test.com',
        password: '10101010',
      };

      const response = await global.testRequest.post('/v1/user').set({ 'x-access-token': token }).send(newUser);

      expect(response.status).toBe(201);
      await expect(AuthService.comparePassword(newUser.password, response.body.data.password)).resolves.toBeTruthy();
      expect(response.body.data).toEqual(
        expect.objectContaining({
          ...newUser,
          ...{ password: expect.any(String) },
        })
      );
    });
    it('should return 422 when there is a validation error(missing name prop)', async () => {
      const newUser = {
        email: 'john@mail.com',
        password: '10101010',
      };
      const response = await global.testRequest.post('/v1/user').set({ 'x-access-token': token }).send(newUser);

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        code: 422,
        errors: {
          body: ['name is a required field'],
        },
      });
    });
    it('should return 422 when there is a validation error(missing email prop)', async () => {
      const newUser = {
        name: 'Teste legal',
        password: '10101010',
      };
      const response = await global.testRequest.post('/v1/user').set({ 'x-access-token': token }).send(newUser);

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        code: 422,
        errors: {
          body: ['email is a required field'],
        },
      });
    });
    it('should return 422 when there is a validation error(missing password prop)', async () => {
      const newUser = {
        name: 'Teste legal',
        email: 'john@mail.com',
      };
      const response = await global.testRequest.post('/v1/user').set({ 'x-access-token': token }).send(newUser);

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        code: 422,
        errors: {
          body: ['password is a required field'],
        },
      });
    });
    it('should return 409 when the email already exists', async () => {
      const newUser = {
        name: 'my name test',
        email: 'jesttest@test.com',
        password: '10101010',
      };
      await global.testRequest.post('/v1/user').set({ 'x-access-token': token }).send(newUser);
      const response = await global.testRequest.post('/v1/user').set({ 'x-access-token': token }).send(newUser);

      expect(response.status).toBe(409);
      expect(response.body).toEqual(
        expect.objectContaining({
          error: 'User validation failed: email: already exists in database',
          method: 'post',
          statusCode: 409,
        })
      );
    });
  });
});

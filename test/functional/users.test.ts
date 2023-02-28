import { User } from '@src/models/users/user.model';
import { AuthService } from '@src/services/auth.service';

describe('User functional tests', () => {
  describe('When creating a new user', () => {
    beforeAll(async () => await User.deleteMany({}));
    it('should successfully create a new user with encrypted password', async () => {
      const newUser = {
        name: 'Matheus',
        email: 'jesttest@test.com',
        password: '10101010',
      };

      const response = await global.testRequest.post('/user').send(newUser);

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
      const response = await global.testRequest.post('/user').send(newUser);

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
      const response = await global.testRequest.post('/user').send(newUser);

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
      const response = await global.testRequest.post('/user').send(newUser);

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
      await global.testRequest.post('/user').send(newUser);
      const response = await global.testRequest.post('/user').send(newUser);

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
  describe('When authenticating a user', () => {
    it('should generate a token for a valid user', async () => {
      const newUser = {
        name: 'Mgp teste',
        email: 'mgp@mgp.com',
        password: '10101010',
      };
      await new User(newUser).save();
      const response = await global.testRequest
        .post('/login')
        .send({ email: newUser.email, password: newUser.password });

      expect(response.body).toEqual(expect.objectContaining({ ...response.body, method: 'post', statusCode: 200 }));
    });
    it('should return UNAUTHORIZED if the user with the given email is not found', async () => {
      const response = await global.testRequest.post('/login').send({ email: 'test@testss.com', password: '10101010' });

      expect(response.status).toBe(401);
    });
    it('should return UNAUTHORIZED if the user is found but the password does not match', async () => {
      const response = await global.testRequest.post('/login').send({ email: 'test@test.com', password: 'wrong-pass' });

      expect(response.status).toBe(401);
    });
  });
});

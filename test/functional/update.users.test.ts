import { User } from '@src/models/users/user.model';
import { AuthService } from '@src/services/auth.service';

describe('User update functional tests', () => {
  describe('When updating a user', () => {
    beforeAll(async () => await User.deleteMany({}));
    const defaultUser = {
      name: 'Default User',
      email: 'default@default.com',
      password: '10101010',
    };
    let token: string;
    let user: User;

    beforeEach(async () => {
      await User.deleteMany({});
      const newuser = new User(defaultUser);
      const userCreated = await newuser.save();
      user = userCreated;
      token = AuthService.generateToken(userCreated.toJSON());
    });
    it('should successfully update a new user with encrypted password', async () => {
      const payload = {
        name: 'ALTERADO ALTERADO',
        email: 'ALTERADO@test.com',
        password: '10101010',
      };

      const response = await global.testRequest
        .patch(`/user/${user._id}`)
        .set({ 'x-access-token': token })
        .send(payload);

      expect(response.status).toBe(200);
      await expect(AuthService.comparePassword(payload.password, response.body.data.password)).resolves.toBeTruthy();
      expect(response.body.data).toEqual(
        expect.objectContaining({
          ...response.body.data,
          ...{ password: expect.any(String) },
        })
      );
    });
    it('should return 422 when there is a validation error(missing name prop)', async () => {
      const newUser = {
        email: 'john@mail.com',
        password: '10101010',
      };
      const response = await global.testRequest
        .patch(`/user/${user._id}`)
        .set({ 'x-access-token': token })
        .send(newUser);

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
      const response = await global.testRequest
        .patch(`/user/${user._id}`)
        .set({ 'x-access-token': token })
        .send(newUser);

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
      const response = await global.testRequest
        .patch(`/user/${user._id}`)
        .set({ 'x-access-token': token })
        .send(newUser);

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
        email: 'email_already_exists@test.com',
        password: '10101010',
      };
      const created1 = await new User(newUser).save();

      const defaultUser = {
        name: 'Default User2',
        email: 'default2@default.com',
        password: '10101010',
      };
      await new User(defaultUser).save();

      const response = await global.testRequest
        .patch(`/user/${created1._id}`)
        .set({ 'x-access-token': token })
        .send(defaultUser);
      expect(response.status).toBe(409);
      expect(response.body).toEqual(
        expect.objectContaining({
          error: 'User validation failed: email: already exists in database',
          method: 'patch',
          statusCode: 409,
        })
      );
    });
    it('should return 409 when id is not a valid mongo objectId', async () => {
      const newUser = {
        name: 'my name test',
        email: 'non-exists@test.com',
        password: '10101010',
      };

      const response = await global.testRequest
        .patch('/user/not-a-valid-id')
        .set({ 'x-access-token': token })
        .send(newUser);

      expect(response.status).toBe(409);
      expect(response.body).toEqual(
        expect.objectContaining({
          error: 'ID not-a-valid-id is not a valid mongo ObjectId .',
          method: 'patch',
          statusCode: 409,
        })
      );
    });
    it('should return 404 when id is not found', async () => {
      const newUser = {
        name: 'my name test',
        email: 'non-exists@test.com',
        password: '10101010',
      };

      const response = await global.testRequest
        .patch('/user/63fe513bf64c141a1464c6a8')
        .set({ 'x-access-token': token })
        .send(newUser);

      expect(response.status).toBe(404);
      expect(response.body).toEqual(
        expect.objectContaining({
          error: 'ID 63fe513bf64c141a1464c6a8 does not exists in the database.',
          method: 'patch',
          statusCode: 404,
        })
      );
    });
  });
});

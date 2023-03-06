import { User } from '@src/models/users/user.model';
import { AuthService } from '@src/services/auth.service';
import { jest, expect, test, it, describe } from '@jest/globals';

describe('GetAllUsersController functional tests', () => {
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
  describe('When retrieving all users from database', () => {
    test('should successfully return a list of users', async () => {
      const response = await global.testRequest.get('/user?skip=0&limit=10').set({ 'x-access-token': token });

      expect(response.status).toBe(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          ...{
            data: [
              {
                name: 'Default User',
                email: 'default@default.com',
                password: expect.any(String),
                id: expect.any(String),
              },
            ],
            method: 'get',
            statusCode: 200,
            timestamp: expect.any(String),
          },
        })
      );
    });
    test('should return a empty list', async () => {
      const response = await global.testRequest.get('/user?skip=100000&limit=10').set({ 'x-access-token': token });

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        data: [],
        method: 'get',
        statusCode: 200,
        timestamp: expect.any(String),
      });
    });
    test('should return 422 when the skip filter is not passed in query', async () => {
      const response = await global.testRequest.get('/user?limit=10').set({ 'x-access-token': token });

      expect(response.status).toBe(422);

      expect(response.body).toEqual({
        code: 422,
        errors: {
          query: ['skip is a required field'],
        },
      });
    });
    test('should return 422 when the limit filter is not passed in query', async () => {
      const response = await global.testRequest.get('/user?skip=10').set({ 'x-access-token': token });

      expect(response.status).toBe(422);

      expect(response.body).toEqual({
        code: 422,
        errors: {
          query: ['limit is a required field'],
        },
      });
    });
    test('should return 422 when both limit  and skip filter is not passed in query', async () => {
      const response = await global.testRequest.get('/user').set({ 'x-access-token': token });

      expect(response.status).toBe(422);

      expect(response.body).toEqual({
        code: 422,
        errors: {
          query: ['skip is a required field', 'limit is a required field'],
        },
      });
    });
  });
});

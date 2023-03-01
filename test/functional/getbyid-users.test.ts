import { User } from '@src/models/users/user.model';
import { AuthService } from '@src/services/auth.service';

describe('GetByIdUserController functional tests', () => {
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
  describe('When retrieving a unique user from database', () => {
    it('should successfully return one user from database', async () => {
      const response = await global.testRequest
        .get('/user/getbyid/63ff60b32f9542d4082a0f50')
        .set({ 'x-access-token': token });
      console.log(response);
      expect(response.status).toBe(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          ...{
            data: {
              name: expect.any(String),
              email: expect.any(String),
              password: expect.any(String),
              id: expect.any(String),
            },

            method: 'get',
            statusCode: 200,
            timestamp: expect.any(String),
          },
        })
      );
    });
    it('should return a empty list', async () => {
      const response = await global.testRequest
        .get('/user/getAll?skip=100000&limit=10')
        .set({ 'x-access-token': token });

      expect(response.status).toBe(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          data: [],
          method: 'get',
          statusCode: 200,
          timestamp: expect.any(String),
        })
      );
    });
    it('should return 422 when the skip filter is not passed in query', async () => {
      const response = await global.testRequest.get('/user/getAll?limit=10').set({ 'x-access-token': token });

      expect(response.status).toBe(422);

      expect(response.body).toEqual({
        code: 422,
        errors: {
          query: ['skip is a required field'],
        },
      });
    });
    it('should return 422 when the limit filter is not passed in query', async () => {
      const response = await global.testRequest.get('/user/getAll?skip=10').set({ 'x-access-token': token });

      expect(response.status).toBe(422);

      expect(response.body).toEqual({
        code: 422,
        errors: {
          query: ['limit is a required field'],
        },
      });
    });
    it('should return 422 when both limit  and skip filter is not passed in query', async () => {
      const response = await global.testRequest.get('/user/getAll').set({ 'x-access-token': token });

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

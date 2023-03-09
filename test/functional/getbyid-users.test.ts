import { User } from '@src/models/users/user.model';
import { AuthService } from '@src/services/auth.service';

describe('GetByIdUserController functional tests', () => {
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
  describe('When retrieving a unique user from database', () => {
    it('should successfully return one user from database', async () => {
      const response = await global.testRequest.get(`/v1/user/${user._id}`).set({ 'x-access-token': token });
      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        data: {
          name: expect.any(String),
          email: expect.any(String),
          password: expect.any(String),
          id: expect.any(String),
        },

        method: 'get',
        statusCode: 200,
        timestamp: expect.any(String),
      });
    });
    it('should return a 404 error when ID does not exists', async () => {
      const response = await global.testRequest
        .get(`/v1/user/63ff66aad8527fc3314a5c75`)
        .set({ 'x-access-token': token });
      expect(response.status).toBe(404);

      expect(response.body).toEqual({
        error: 'ID 63ff66aad8527fc3314a5c75 does not exists in the database.',
        method: 'get',
        statusCode: 404,
        timestamp: expect.any(String),
      });
    });
    it('should return a 409 error when ID is not a valid ID', async () => {
      const response = await global.testRequest.get(`/v1/user/not-valid-id`).set({ 'x-access-token': token });
      expect(response.status).toBe(409);

      expect(response.body).toEqual({
        error: 'ID not-valid-id is not a valid mongo ObjectId .',
        method: 'get',
        statusCode: 409,
        timestamp: expect.any(String),
      });
    });
  });
});

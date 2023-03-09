import { User } from '@src/models/users/user.model';

describe('SignIn functional tests', () => {
  describe('When authenticating a user', () => {
    beforeAll(async () => await User.deleteMany({}));
    it('should generate a token for a valid user', async () => {
      const newUser = {
        name: 'Mgp teste',
        email: 'mgp@mgp.com',
        password: '10101010',
      };
      await new User(newUser).save();
      const response = await global.testRequest
        .post('/signin')
        .send({ email: newUser.email, password: newUser.password });

      expect(response.body).toEqual(expect.objectContaining({ ...response.body, method: 'post', statusCode: 200 }));
    });
    it('should return UNAUTHORIZED if the user with the given email is not found', async () => {
      const response = await global.testRequest
        .post('/v1/signin')
        .send({ email: 'test@testss.com', password: '10101010' });

      expect(response.status).toBe(401);
    });
    it('should return UNAUTHORIZED if the user is found but the password does not match', async () => {
      const response = await global.testRequest
        .post('/v1/signin')
        .send({ email: 'test@test.com', password: 'wrong-pass' });

      expect(response.status).toBe(401);
    });
  });
});

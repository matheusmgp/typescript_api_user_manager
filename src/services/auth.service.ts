import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import { User } from '@src/models/users/user.model';

export interface DecodedUser extends Omit<User, '_id'> {
  id: string;
}

const hashPassword = async (password: string, salt = 10): Promise<string> => {
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (payload: any): string => {
  return jwt.sign(payload, config.get('App.auth.key'), {
    expiresIn: config.get('App.auth.tokenExpiresIn'),
  });
};

const decodeToken = (token: string): DecodedUser => {
  return jwt.verify(token, config.get('App.auth.key')) as DecodedUser;
};

export const AuthService = {
  hashPassword,
  comparePassword,
  generateToken,
  decodeToken,
};

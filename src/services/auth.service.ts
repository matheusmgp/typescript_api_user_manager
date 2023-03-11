import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import { User } from '@src/models/users/user.model';

export interface DecodedUser extends Omit<User, '_id'> {
  id: string;
}

/**
 * Função para dar um hash na senha
 */
const hashPassword = async (password: string, salt = 10): Promise<string> => {
  return await bcrypt.hash(password, salt);
};
/**
 * Função que compara senhas
 */
const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Função para gerar um token JWT
 */
const generateToken = (payload: any): string => {
  return jwt.sign(payload, config.get('App.auth.key'), {
    expiresIn: config.get('App.auth.tokenExpiresIn'),
  });
};

/**
 * Função para DECODIFICAR um token JWT
 */
const decodeToken = (token: string): DecodedUser => {
  return jwt.verify(token, config.get('App.auth.key')) as DecodedUser;
};

export const AuthService = {
  hashPassword,
  comparePassword,
  generateToken,
  decodeToken,
};

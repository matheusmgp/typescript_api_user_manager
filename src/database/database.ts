import config, { IConfig } from 'config';
import { connect as mongooseConnect, connection } from 'mongoose';

const dbConfig: IConfig = config.get('App.database');

export const connect = async (): Promise<void> => {
  const connected = await mongooseConnect(dbConfig.get('mongoUrl'));
  console.log('Connected to MONGO database');
};

export const close = (): Promise<void> => connection.close();

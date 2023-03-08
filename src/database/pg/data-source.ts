import { DataSource } from 'typeorm';
import config, { IConfig } from 'config';
import 'reflect-metadata';
const dbConfig: IConfig = config.get('App.postgres');

const PORT: number = dbConfig.get('db_port');
const HOST: string = dbConfig.get('db_host');
const USERNAME: string = dbConfig.get('db_user');
const PASS: string = dbConfig.get('db_pass');
const NAME: string = dbConfig.get('db_name');

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 6500,
  username: USERNAME,
  password: PASS,
  database: NAME,
  synchronize: false,
  logging: false,
  //entities: [`${__dirname}/**/entities/*.{ts,js}`],
  // migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  entities: [`src/entities/**/*.ts`],
  migrations: [`src/migrations/**/*.ts`],
});

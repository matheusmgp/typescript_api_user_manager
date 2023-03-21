import 'reflect-metadata';
import '../src/shared/containers';
import { SetupServer } from '@src/server/server';
import config from 'config';
import supertest from 'supertest';
import LogService from '../src/logs/log.service';

let server: SetupServer;
beforeAll(async () => {
  server = new SetupServer(config.get('App.port'), new LogService());
  server.init();
  global.testRequest = supertest(server.getApp());
});

afterAll(async () => await server.close());

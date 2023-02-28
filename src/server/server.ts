import '../util/module-alias';
import express, { Application } from 'express';
import { router } from './routes';
import config from 'config';
import * as database from '@src/database/database';

export class SetupServer {
  constructor(private port = config.get('App.port'), private server = express()) {}

  public async init(): Promise<void> {
    this.server.use(express.json());
    this.start();
    this.setRoutes();
    await this.databaseSetup();
  }
  public start(): void {
    this.server.listen(this.port, () => {
      console.info('Server listening on port: ' + this.port);
    });
  }
  public setRoutes(): void {
    this.server.use(router);
  }
  private async databaseSetup(): Promise<void> {
    await database.connect();
  }
  public async close(): Promise<void> {
    await database.close();
  }
  public getApp(): Application {
    return this.server;
  }
}

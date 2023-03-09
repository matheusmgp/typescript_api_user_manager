import '../util/module-alias';
import express, { Application } from 'express';
import { router } from './routes';
import config from 'config';
import * as database from '@src/database/mongo/database';

export class SetupServer {
  constructor(private port = config.get('App.port'), private app = express()) {}

  public async init(): Promise<void> {
    this.app.use(express.json());
    this.start();
    this.setRoutes();
    await this.databaseSetup();
  }
  public start(): void {
    this.app.listen(this.port, () => {
      console.info('API running on port: ' + this.port);
    });
  }
  public setRoutes(): void {
    this.app.use('/v1', router);
  }
  private async databaseSetup(): Promise<void> {
    await database.connect();
  }
  public async close(): Promise<void> {
    await database.close();
  }
  public getApp(): Application {
    return this.app;
  }
}

import express, { Application } from 'express';
import { router } from './routes';
import config from 'config';
import * as database from '@src/database/mongo/database';
import LogService from '@src/logs/log.service';

export class SetupServer {
  constructor(
    private port = config.get('App.port'),
    private readonly logService: LogService,
    private app = express()
  ) {}

  /**
   * Funcao trigger para iniciar o server ,setando os .use() ,routes ,logging e .listen()
   */
  public init(): void {
    this.app.use(express.json());
    this.logService.log(this.app, 'requests');
    this.start();
    this.setRoutes();
  }
  /**
   * Função que inicia o server
   */
  public start(): void {
    this.app.listen(this.port, () => {
      console.info('API running on port: ' + this.port);
    });
  }
  /**
   * Função que seta as rotas
   */
  public setRoutes(): void {
    this.app.use(config.get('App.api_version'), router);
  }
  /**
   * Função que conecta ao mongodb
   */
  async databaseSetup(): Promise<void> {
    await database.connect();
  }
  /**
   * Função que fecha a connection com o mongodb
   */
  public async close(): Promise<void> {
    await database.close();
  }
  /**
   *  Função que retorna o objeto app
   */
  public getApp(): Application {
    return this.app;
  }
}

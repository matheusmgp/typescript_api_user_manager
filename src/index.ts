import { SetupServer } from './server/server';
import config from 'config';
import { AppDataSource } from './database/pg/data-source';

(async (): Promise<void> => {
  //initialize pg database
  AppDataSource.initialize().then(() => {
    console.log('Connected to postgres Database');
    const server = new SetupServer(config.get('App.port'));
    server.init();
  });
})();

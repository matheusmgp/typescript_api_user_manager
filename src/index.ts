import './util/module-alias';
import 'reflect-metadata';
import './shared/containers';
import { SetupServer } from './server/server';
import config from 'config';
import LogService from './logs/log.service';

/**
 * Inicia a aplicação toda
 */
(async (): Promise<void> => {
  const server = new SetupServer(config.get('App.port'), new LogService());
  server.databaseSetup();
  server.init();
})();

import { SetupServer } from './server/server';
import config from 'config';
import LogService from './logs/log.service';

(async (): Promise<void> => {
  const server = new SetupServer(config.get('App.port'), new LogService());
  server.init();
})();

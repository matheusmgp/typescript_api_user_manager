import morganBody from 'morgan-body';
import fs from 'fs';
import path from 'path';
import { Express } from 'express';
import moment from 'moment';

export default class LogService {
  public log(app: Express, name: string) {
    const stream = fs.createWriteStream(path.join(__dirname, './', `${name}-${moment().format('YYYY-MM-DD')}.log`), {
      flags: 'a',
    });
    morganBody(app, {
      noColors: true,
      stream: stream,
      logIP: true,
    });
  }
}

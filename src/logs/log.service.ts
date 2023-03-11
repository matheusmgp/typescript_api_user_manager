import morganBody from 'morgan-body';
import fs from 'fs';
import path from 'path';
import { Express } from 'express';

export default class LogService {
  public log(app: Express, name: string) {
    console.log('chegou', app, name);
    const stream = fs.createWriteStream(path.join(__dirname, './', name), { flags: 'a' });
    morganBody(app, {
      noColors: true,
      stream: stream,
      logIP: true,
    });
  }
}

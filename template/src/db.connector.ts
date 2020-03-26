import { MikroConnector } from 'moleculer-context-db';
import { EventEmitter } from 'events';
import { config } from './lib/env';
import { entities } from './entities';

let dbConnector: MikroConnector;
let initError: Error | null;

let pending: null | EventEmitter = null;

export async function getDbConnector(): Promise<MikroConnector> {
  if (dbConnector) {
    return dbConnector;
  }

  if (initError) {
    throw initError;
  }

  // eslint-disable-next-line no-async-promise-executor, consistent-return
  return new Promise(async (resolve, reject) => {
    if (pending) {
      pending.once('resolve', resolve);
      pending.once('error', reject);
      return;
    }

    // 1-st call ever
    pending = new EventEmitter();
    pending.once('resolve', resolve);
    pending.once('error', reject);

    // try/catch because promise executor is async
    try {
      const tmpConnector = new MikroConnector();

      await tmpConnector.init({
        type: config.DB_CORE__TYPE,
        dbName: config.DB_CORE__DB_NAME,
        name: config.DB_CORE__NAME,
        clientUrl: config.DB_CORE__CLIENT_URL,
        user: config.DB_CORE__USER,
        password: config.DB_CORE__PASSWORD,
        entities,
        cache: {
          enabled: false
        }
      });

      dbConnector = tmpConnector;
    } catch (err) {
      initError = err;
      pending.emit('error', err);
      pending.removeAllListeners();
      pending = null;
      return;
    }

    pending.emit('resolve', dbConnector);
    pending.removeAllListeners();
    pending = null;
  });
}

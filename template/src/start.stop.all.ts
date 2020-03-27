/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { getLogMiddleware } from './middlewares/moleculer.log.middleware';
import { getDbMiddleware } from './middlewares/moleculer.db.middleware';
import { getDbConnector } from './db.connector';
import {
  startServiceAndBroker,
  getService
} from './lib/start.service.and.broker';
import { broker } from './lib/moleculer/broker';

let started = false;

export async function startAll() {
  started = true;

  const logInfo = broker.logger.info.bind(broker.logger);
  const logMiddleware = getLogMiddleware(logInfo);

  const dbMiddleware = await getDbMiddleware();

  const middlewares = [logMiddleware, dbMiddleware];

  await startServiceAndBroker(middlewares);
}

export async function stopAll(): Promise<void> {
  if (!started) {
    throw new Error(`stopAll() should not be called before startAll().`);
  }

  const service = await getService();
  const dbConnector = await getDbConnector();

  await broker.destroyService(service);
  await broker.stop();
  await dbConnector.getORM().close();

  started = false;
}

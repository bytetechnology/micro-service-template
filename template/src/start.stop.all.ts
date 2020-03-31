/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { getLogMiddleware } from './middlewares/moleculer.log.middleware';
{{#if needDb}}
import { getDbMiddleware } from './middlewares/moleculer.db.middleware';
import { getDbConnector } from './db.connector';
{{/if}}
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

  const middlewares = [logMiddleware];

  {{#if needDb}}
  const dbMiddleware = await getDbMiddleware();
  middlewares.push(dbMiddleware);
  {{/if}}

  await startServiceAndBroker(middlewares);
}

export async function stopAll(): Promise<void> {
  if (!started) {
    throw new Error(`stopAll() should not be called before startAll().`);
  }

  {{#if needDb}}
  const dbConnector = await getDbConnector();
  await dbConnector.getORM().close();
  {{/if}}

  const service = await getService();
  await broker.destroyService(service);
  await broker.stop();
  

  started = false;
}

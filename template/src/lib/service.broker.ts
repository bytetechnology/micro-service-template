/**
 * Service broker and start/init function.
 * Use it everywhere (production, dev, tests).
 * Adapt using proper config (env vars).
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { TypedServiceBroker } from 'moleculer-service-ts';
import { Service, Middleware, ServiceBroker, EventSchema } from 'moleculer';
import {
  MikroConnector,
  DatabaseContextManager,
  MoleculerMikroContext
} from 'moleculer-context-db';
import { ServiceAction, ServiceEvent, ServiceName } from '../service.types';
import { entities } from '../entities';
import { config } from './env';

import { brokerConfig } from './moleculer/broker.config';
import { {{capitalizedServiceName}}Service } from '../{{serviceName}}.service';
import { initAndGetDbConnector } from '../db.connector';

let service: Service;
let started = false;

export const broker: TypedServiceBroker<
  ServiceAction,
  ServiceEvent,
  ServiceName
> = new TypedServiceBroker(brokerConfig);

const LogMiddleware: Middleware = {
  localAction(next: any) {
    return function logAction(this: ServiceBroker, ctx: MoleculerMikroContext) {
      broker.logger.info(
        `Action '${(ctx.action as any).name}'.  '${ctx.caller}'. CallerNode '${
          ctx.nodeID
        }'.`
      );
      return next(ctx);
    };
  },
  localEvent(next: any, event: EventSchema) {
    return function logEvent(payload: any, sender: string, eventName: string) {
      broker.logger.info(`Event ${event.name}. From service '${sender}'`);
      return next(payload, sender, eventName);
    };
  }
};

export async function startService(): Promise<Service> {
  if (started) {
    throw new Error(
      `startService() already called. Now you can only call stopService().`
    );
  }
  started = true;

  broker.middlewares.add(LogMiddleware);

  const dbConnector: MikroConnector = await initAndGetDbConnector();

  // add database middleware to broker
  const dbContextManager: DatabaseContextManager = new DatabaseContextManager(
    dbConnector
  );
  broker.middlewares.add(dbContextManager.middleware());

  // create our service
  service = broker.createService({{capitalizedServiceName}}Service);

  await broker.start();
  await broker.waitForServices('{{serviceName}}');

  return service;
}

export async function stopService(): Promise<void> {
  if (!started) {
    throw new Error(`stopService() should not be called before startService()`);
  }
  await broker.destroyService(service);
  await broker.stop();
  await dbConnector.getORM().close();
}

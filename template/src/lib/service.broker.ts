import { TypedServiceBroker } from "moleculer-service-ts";
import { Service } from "moleculer";
import { MikroConnector, DatabaseContextManager } from 'moleculer-context-db';
import { ServiceAction, ServiceEvent, ServiceName } from '../service.types';
import entities from '../entities';

import { brokerConfig } from "./internal/broker.confing";
import SampleService from "../sample.service";

let service: Service;
let started = false;

export const broker: TypedServiceBroker<ServiceAction, ServiceEvent, ServiceName> = new TypedServiceBroker(brokerConfig);
export const dbConnector: MikroConnector = new MikroConnector();

export async function startService(): Promise<Service> {
  if (started) {
    throw new Error(`startService() already called. Now you can only call stopService().`);
  }
  started = true;

  await dbConnector.init({
    type: 'sqlite', // TODO use env
    dbName: ':memory:', // TODO use env
    name: 'micro-sample-db',
    entities,
    cache: {
      enabled: false
    }
  });

  // add database middleware to broker
  const dbContextManager: DatabaseContextManager = new DatabaseContextManager(
    dbConnector
  );
  broker.middlewares.add(dbContextManager.middleware());

  // create our service
  service = broker.createService(SampleService);

  await broker.start();
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

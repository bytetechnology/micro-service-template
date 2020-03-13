/**
 * Entry point for the sample service of the Byte Technology cloud backend.
 * Uses the moleculer microservices framework.
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */

import { TypedServiceBroker } from 'moleculer-service-ts';
import { MikroConnector, DatabaseContextManager } from 'moleculer-context-db';

// Our stuff
import moleculerBrokerConfig from './moleculer.broker.config';
import SampleService from './sample.service';
import entities from './entities/index';

// Import our service names, actions, and events
import { ServiceAction, ServiceEvent, ServiceName } from './types/index';

// Create our moleculer service broker
const moleculerBroker: TypedServiceBroker<
  ServiceAction,
  ServiceEvent,
  ServiceName
> = new TypedServiceBroker<ServiceAction, ServiceEvent, ServiceName>(
  moleculerBrokerConfig
);

async function main() {
  // Set the connector for the context manager
  const connector = new MikroConnector();
  await connector.init(
    (process.env.DATABASE_TYPE || 'sqlite') as
      | 'mongo'
      | 'postgresql'
      | 'sqlite'
      | 'mysql',
    process.env.DATABASE_NAME || ':memory:',
    process.env.DATABASE_URL || '',
    './',
    entities
  );

  DatabaseContextManager.setDatabaseConnector(connector);

  // Add the database context manager to the middleware for the broker.
  moleculerBroker.middlewares.add(DatabaseContextManager.middleware());

  // Create our service
  moleculerBroker.createService(SampleService);

  // Start the broker and go into in REPL mode for non-production environments
  moleculerBroker.start().then(() => {
    if (process.env.NODE_ENV === 'development') {
      moleculerBroker.repl();
    }
  });
}

main();

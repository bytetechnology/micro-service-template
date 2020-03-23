/**
 * Entry point for the {{serviceName}} service of the Byte Technology cloud backend.
 * Uses the moleculer microservices framework.
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { startService, broker } from './lib/service.broker';

async function main() {
  // Set the connector for the context manager
  const connector = new MikroConnector();
  await connector.init({
    type: 'sqlite',
    dbName: ':memory:',
    entities,
    cache: {
      enabled: false
    }
  });

  const generator = connector.getORM().getSchemaGenerator();
  await generator.updateSchema();

  const dbContextManager: DatabaseContextManager = new DatabaseContextManager(
    connector
  );

  // Add the database context manager to the middleware for the broker.
  moleculerBroker.middlewares.add(dbContextManager.middleware());

  // Create our service
  moleculerBroker.createService({{capitalizedServiceName}}Service);

  if (process.env.NODE_ENV === 'development') {
    broker.repl();
  }
}

main();

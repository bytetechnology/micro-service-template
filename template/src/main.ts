/**
 * Entry point for the {{serviceName}} service of the Byte Technology cloud backend.
 * Uses the moleculer microservices framework.
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { config } from './lib';
import { startService, broker } from './lib/service.broker';

async function main() {
  await startService();

  if (config.NODE_ENV === 'development') {
    broker.repl();
  }
}

main();

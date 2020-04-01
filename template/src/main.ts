/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { broker } from './lib/moleculer/broker';
import { startAll } from './start.stop.all';
import { config } from './lib/env';

async function main() {
  await startAll();

  if (config.NODE_ENV === 'development') {
    broker.repl();
  }
}

main();

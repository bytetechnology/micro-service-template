/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { broker } from './lib/moleculer/broker';
import { startAll } from './start.stop.all';
import { config } from './lib/env';
{{#if needDb}}
import { getDbConnector } from './db.connector';
{{/if}}

async function main() {
  await startAll();

{{#if sql}}
  const connector = await getDbConnector();
  await connector
    .getORM()
    .getSchemaGenerator()
    .updateSchema(false);
{{/if}}
{{#if mongo}}
  const connector = await getDbConnector();
  await connector
    .getORM()
    .em.getDriver()
    .createCollections();
{{/if}}  

  if (config.NODE_ENV === 'development') {
    broker.repl();
  }
}

main();

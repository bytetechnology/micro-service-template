/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
{{#if mongo}}
{{#if mongoTransactions}}
import { MongoMemoryReplSet } from 'mongodb-memory-server';
{{/if}}
{{#unless mongoTransactions}}
import { MongoMemoryServer } from 'mongodb-memory-server';
{{/unless}}

{{/if}}
import { broker } from './lib/moleculer/broker';
import { startAll } from './start.stop.all';
import { config } from './lib/env';

async function main() {
{{#if mongo}}
// if we are doing mongo, we need to spin up a mongo instance since otherwise we default to sqlite
{{#if mongoTransactions}}
  const mongod = new MongoMemoryReplSet({
    replSet: { storageEngine: 'wiredTiger' }
  });
  await mongod.waitUntilRunning();
{{/if}}
{{#unless mongoTransactions}}
  const mongod = new MongoMemoryServer();
{{/unless}}

const uri = await mongod.getUri();
const dbName = await mongod.getDbName();

config.DB_CORE__TYPE = 'mongo';
config.DB_CORE__CLIENT_URL = uri;
config.DB_CORE__DB_NAME = dbName;
{{/if}}
  await startAll();

  if (config.NODE_ENV === 'development') {
    broker.repl();
  }

  if (process.env.NODE_ENV === 'test') {
    const repl = broker.repl();
    setTimeout(async () => {
      await repl.exec('quit');
    }, 500);
  }
}

main();

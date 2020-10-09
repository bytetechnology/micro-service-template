/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
{{#if needDb}}
import 'reflect-metadata';
{{/if}}
import 'jest-extended';
{{#if mongo}}
{{#if mongoTransactions}}
import { MongoMemoryReplSet } from 'mongodb-memory-server';
{{/if}}
{{#unless mongoTransactions}}
import { MongoMemoryServer } from 'mongodb-memory-server';
{{/unless}}
{{/if}}
import { config } from '../src/lib/env';

{{#if mongo}}
  let mongod: {{#if mongoTransactions}}MongoMemoryReplSet{{/if}}{{#unless mongoTransactions}}MongoMemoryServer{{/unless}};
{{/if}}


// Override default set in  package.json => jest.testTimeout
if (config.JEST_TIMEOUT !== undefined) {
  jest.setTimeout(+config.JEST_TIMEOUT);
}

{{#unless needDb}}
// eslint-disable-next-line no-empty-function
{{/unless}}
{{#if sql}}
// eslint-disable-next-line no-empty-function
{{/if}}
async function globalSetup() {
  {{#if mongo}}
  // create an in-memory mongodb instance
  {{#if mongoTransactions}}
  mongod = new MongoMemoryReplSet({
    replSet: { storageEngine: 'wiredTiger' }
  });
  await mongod.waitUntilRunning();
  {{/if}}
  {{#unless mongoTransactions}}
  mongod = new MongoMemoryServer();
  {{/unless}}

  config.DB_CORE__CLIENT_URL = await mongod.getUri();
  config.DB_CORE__DB_NAME = await mongod.getDbName();
{{/if}}
}

{{#unless needDb}}
// eslint-disable-next-line no-empty-function
{{/unless}}
{{#if sql}}
// eslint-disable-next-line no-empty-function
{{/if}}
async function globalTearDown() {
{{#if mongo}}
  await mongod.stop();
{{/if}}
}

export { globalSetup, globalTearDown };

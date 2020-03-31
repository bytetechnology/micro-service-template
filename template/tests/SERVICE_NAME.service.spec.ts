/**
 * Entry point for unit test.
 * Uses the moleculer microservices framework.
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */

import { Service as MoleculerService } from 'moleculer';
{{#if mongo}}
import { {{#if mongoTransactions}}MongoMemoryReplSet{{/if}}{{#unless mongoTransactions}}MongoMemoryServer{{/unless}} } from 'mongodb-memory-server';
{{/if}}

{{#if needDb}}
import { resetServiceDB } from './utils';
{{/if}}
import { startAll, stopAll } from '../src/start.stop.all';
import { getService } from '../src/lib/start.service.and.broker';
import { broker } from '../src/lib/moleculer/broker';
{{#if mongo}}
import { config } from '../src/lib/env';
{{/if}}

describe('{{capitalizedServiceName}} unit tests', () => {
  let service: MoleculerService;
{{#if mongo}}
  let mongod: {{#if mongoTransactions}}MongoMemoryReplSet{{/if}}{{#unless mongoTransactions}}MongoMemoryServer{{/unless}};
{{/if}}

  beforeAll(async done => {
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

    const uri = await mongod.getUri();
    const dbName = await mongod.getDbName();

    config.DB_CORE__TYPE = 'mongo';
    config.DB_CORE__CLIENT_URL = uri;
    config.DB_CORE__DB_NAME = dbName;
{{/if}}
    
    await startAll();
    service = await getService();
    done();
  });

  afterAll(async done => {
    await stopAll();
{{#if mongo}}
    await mongod.stop();
{{/if}}
    done();
  });

  beforeEach(async done => {
    {{#if needDb}}
    await resetServiceDB();
    {{/if}}
    done();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Ping test', async done => {
    // call an action without a parameter object
    const response: string = await broker.call('{{serviceName}}.ping');
    expect(response).toBe('Hello Byte!');
    done();
  });

  test('Action with required parameter', async done => {
    // call an action with a parameter object
    const response: string = await broker.call(
      '{{serviceName}}.welcome',
      {
        name: 'John Doe'
      },
      { caller: 'jest' }
    );
    expect(response).toBe('Welcome John Doe!');
    done();
  });

  test('Action with invalid parameter should throw', async done => {
    // call an action with a parameter object
    try {
      await broker.call(
        '{{serviceName}}.welcome',
        {
          mistake: 'invalid property name'
        } as any,
        { caller: 'jest' }
      );
      // eslint-disable-next-line no-undef
      fail(`Expected ValidationError.`);
    } catch (err) {
      expect(err.code).toBe(400);
    }
    done();
  });

  test('Event without parameter', async done => {
    // create a spy to look at events
    const spy = jest.spyOn(service, 'eventTester');

    // emit an event as well so that that can get tested. no return on event
    await broker.emit('eventWithoutPayload');

    expect(spy).toBeCalledTimes(1);
    done();
  });

  test('Event with required parameter', async done => {
    // create a spy to look at events
    const spy = jest.spyOn(service, 'eventTester');

    // emit an event as well so that that can get tested. no return on event
    await broker.emit('eventWithPayload', { id: '1234' });

    expect(spy).toBeCalledTimes(1);
    done();
  });

  {{#if needDb}}
  test('Test database entity creation', async done => {
    // create a sample entity
    const entityId = await broker.call(
      '{{serviceName}}.addTestEntity',
      {
        aKey: 'A Key',
        aValue: 'A Value'
      },
      { caller: 'jest' }
    );

    expect(entityId).toBeTruthy();
    done();
  });
  {{/if}}
});

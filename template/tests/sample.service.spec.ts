/**
 * Entry point for unit test.
 * Uses the moleculer microservices framework.
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */

import { Service as MoleculerService } from 'moleculer';
import { TypedServiceBroker } from 'moleculer-service-ts';
import { MikroConnector, DatabaseContextManager } from 'moleculer-context-db';

import { ServiceAction, ServiceEvent, ServiceName } from '../src/types/index';
import {{capitalizedServiceName}}Service from '../src/{{serviceName}}.service';
import entities from '../src/entities/index';

describe('{{serviceName}} unit tests', () => {
  // create a typed service broker
  const typedBroker: TypedServiceBroker<
    ServiceAction,
    ServiceEvent,
    ServiceName
  > = new TypedServiceBroker<ServiceAction, ServiceEvent, ServiceName>({
    logLevel: 'info'
  });

  let typedService: MoleculerService;

  beforeAll(async () => {
    // Set the database connector for the context manager
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
    await generator.dropSchema();
    await generator.createSchema();

    // add database middleware to broker
    const dbContextManager: DatabaseContextManager = new DatabaseContextManager(
      connector
    );
    typedBroker.middlewares.add(dbContextManager.middleware());

    // create our service
    typedService = typedBroker.createService({{capitalizedServiceName}}Service);

    await typedBroker.start();
  });

  afterAll(async () => {
    typedBroker.destroyService(typedService);
    await typedBroker.stop();
  });

  test('Ping test', async () => {
    // call an action without a parameter object
    const response: string = await typedBroker.call('{{serviceName}}.ping');
    expect(response).toBe('Hello Byte!');
  });

  test('Action with required parameter', async () => {
    // call an action with a parameter object
    const response: string = await typedBroker.call(
      '{{serviceName}}.welcome',
      {
        name: 'John Doe'
      },
      { caller: 'jest' }
    );
    expect(response).toBe('Welcome John Doe!');
  });

  test('Event without parameter', async () => {
    // create a spy to look at events
    const spy = jest.spyOn(typedService, 'eventTester');

    // emit an event as well so that that can get tested. no return on event
    typedBroker.emit('eventWithoutPayload');

    expect(spy).toBeCalledTimes(1);
  });

  test('Event with required parameter', async () => {
    // create a spy to look at events
    const spy = jest.spyOn(typedService, 'eventTester');

    // emit an event as well so that that can get tested. no return on event
    typedBroker.emit('eventWithPayload', { id: '1234' });

    expect(spy).toBeCalledTimes(2);
  });

  test('Test database entity creation', async () => {
    // create a sample user
    const userId = await typedBroker.call('{{serviceName}}.addUser', {
      name: 'Byte User',
      passwordHash: 'passwordHash'
    });

    expect(userId).toBe(1);
  });
});

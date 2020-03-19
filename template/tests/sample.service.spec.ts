/**
 * Entry point for unit test.
 * Uses the moleculer microservices framework.
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */

import { Service as MoleculerService } from 'moleculer';
import { TypedServiceBroker } from 'moleculer-service-ts';
import { MikroConnector, DatabaseContextManager } from 'moleculer-context-db';

import { ServiceAction, ServiceEvent, ServiceName } from '../src/service.types/index';
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
  let connector: MikroConnector;

  beforeAll(async done => {
    // Set the database connector for the context manager
    connector = new MikroConnector();
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
    done();
  });

  afterAll(async done => {
    await typedBroker.destroyService(typedService);
    await typedBroker.stop();
    await connector.getORM().close();
    done();
  });

  test('Ping test', async done => {
    // call an action without a parameter object
    const response: string = await typedBroker.call('{{serviceName}}.ping');
    expect(response).toBe('Hello Byte!');
    done();
  });

  test('Action with required parameter', async done => {
    // call an action with a parameter object
    const response: string = await typedBroker.call(
      '{{serviceName}}.welcome',
      {
        name: 'John Doe'
      },
      { caller: 'jest' }
    );
    expect(response).toBe('Welcome John Doe!');
    done();
  });

  test('Event without parameter', async done => {
    // create a spy to look at events
    const spy = jest.spyOn(typedService, 'eventTester');

    // emit an event as well so that that can get tested. no return on event
    typedBroker.emit('eventWithoutPayload');

    expect(spy).toBeCalledTimes(1);
    done();
  });

  test('Event with required parameter', async done => {
    // create a spy to look at events
    const spy = jest.spyOn(typedService, 'eventTester');

    // emit an event as well so that that can get tested. no return on event
    typedBroker.emit('eventWithPayload', { id: '1234' });

    expect(spy).toBeCalledTimes(2);
    done();
  });

  test('Test database entity creation', async done => {
    // create a sample entity
    const entityId = await typedBroker.call('{{serviceName}}.addTestEntity', {
      aKey: 'A Key',
      aValue: 'A Value'
    });

    expect(entityId).toBe(1);
    done();
  });
});

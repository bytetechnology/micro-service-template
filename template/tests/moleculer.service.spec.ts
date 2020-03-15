/**
 * Entry point for unit test.
 * Uses the moleculer microservices framework.
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */

import {
  Service as MoleculerService,
  ServiceBroker as UntypedServiceBroker
} from 'moleculer';
import { TypedServiceBroker } from 'moleculer-service-ts';
import { MikroConnector, DatabaseContextManager } from 'moleculer-context-db';

import { ServiceAction, ServiceEvent, ServiceName } from '../src/types/index';
import sampleService from '../src/sample.service';
import entities from '../src/entities/index';

describe('micro-sample', () => {
  // create a typed service broker
  const typedBroker: TypedServiceBroker<
    ServiceAction,
    ServiceEvent,
    ServiceName
  > = new TypedServiceBroker<ServiceAction, ServiceEvent, ServiceName>({
    logLevel: 'info',
    namespace: 'typed-broker'
  });

  // create and untyped service broker to call actions and emit events that Typescript won't allow
  const untypedBroker: UntypedServiceBroker = new UntypedServiceBroker({
    logLevel: 'info',
    namespace: 'untyped-broker'
  });
  let typedService: MoleculerService;
  let untypedService: MoleculerService;

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

    // add database middleware to brokers
    DatabaseContextManager.setDatabaseConnector(connector);
    typedBroker.middlewares.add(DatabaseContextManager.middleware());
    untypedBroker.middlewares.add(DatabaseContextManager.middleware());

    // create our service on both typed and untyped broker
    typedService = typedBroker.createService(sampleService);
    untypedService = untypedBroker.createService(sampleService);

    await typedBroker.start();
    await untypedBroker.start();
  });

  afterAll(async () => {
    typedBroker.destroyService(typedService);
    untypedBroker.destroyService(untypedService);
    await typedBroker.stop();
    await untypedBroker.stop();
  });

  test('Action without parameter', async () => {
    // emit an event as well so that that can get tested. no return on event
    typedBroker.emit('sample.eventWithoutPayload', undefined, 'sample');
    // Bypass moleculer-service-ts package and emit an illegal event
    untypedBroker.emit('sample.eventWithoutPayload', { id: '1234' });

    // call an action without a parameter object
    const response: string = await typedBroker.call('sample.hello');
    expect(response).toBe('Hello Byte!');
  });

  test('Action with required parameter', async () => {
    // emit an event as well so that that can get tested. no return on event
    typedBroker.emit('sample.eventWithPayload', { id: '1234' });
    // Bypass moleculer-service-ts package and emit an illegal event
    untypedBroker.emit('sample.eventWithPayload');

    // call an action with a parameter object
    const response: string = await typedBroker.call(
      'sample.welcome',
      {
        name: 'John Doe'
      },
      { caller: 'jest' }
    );
    expect(response).toBe('Welcome John Doe!');
  });

  test('Action with missing required parameter', async () => {
    // call action without required parameters
    await expect(untypedBroker.call('sample.welcome')).rejects.toThrow(
      'Parameters validation error!'
    );
  });

  test('Test DB connection with MikroORM', async () => {
    // create a sample user
    const userId = await typedBroker.call('sample.addUser', {
      name: 'Byte User',
      passwordHash: 'passwordHash'
    });

    expect(userId).toBe(1);
  });
});

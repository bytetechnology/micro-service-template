/**
 * Entry point for unit test.
 * Uses the moleculer microservices framework.
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */

import { Service as MoleculerService } from 'moleculer';

import { startService, stopService, broker } from '../src/lib/service.broker';
import { resetServiceDB } from './utils';

describe('{{capitalizedServiceName}} unit tests', () => {
  let service: MoleculerService;

  beforeAll(async done => {
    service = await startService();
    done();
  });

  afterAll(async done => {
    await stopService();
    done();
  });

  beforeEach(async done => {
    await resetServiceDB();
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

    expect(entityId).toBe(1);
    done();
  });
});
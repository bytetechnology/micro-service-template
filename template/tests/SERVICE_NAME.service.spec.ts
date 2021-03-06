/**
 * Entry point for service unit tests.
 * Uses the moleculer microservices framework.
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */

import { Service as MoleculerService } from 'moleculer';
import { WelcomeResponse } from '../src/api';

import { globalSetup, globalTearDown } from './setup';
{{#if needDb}}
import { resetServiceDB } from './utils';
{{/if}}
import { startAll, stopAll } from '../src/start.stop.all';
import { getService } from '../src/lib/start.service.and.broker';
import { broker } from '../src/lib/moleculer/broker';
import { sudoCall } from '../src/lib/common.utils';

describe('{{capitalizedCamelCaseServiceName}} unit tests', () => {
  let service: MoleculerService;

  beforeAll(async done => {
    await globalSetup(); // has to be first

    await startAll();
    service = await getService();
    done();
  });

  afterAll(async done => {
    await stopAll();

    await globalTearDown(); // has to be last
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
    const response = await broker.call(
      '{{serviceName}}.welcome',
      {
        name: 'John Doe'
      },
      sudoCall
    );
    const expectedResponse: WelcomeResponse = { greetings: `Welcome John Doe; caller: ${sudoCall.caller}!` };

    expect(response).toStrictEqual(expectedResponse);
    done();
  });

  test('Action with unauthenticated call should throw', async done => {
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
      expect(err.code).toBe(401);
    }
    done();
  });

  test('Event without parameter', async done => {
    // create a spy to look at events
    const spy = jest.spyOn(service, 'eventTester');

    // emit an event as well so that that can get tested. no return on event
    await (broker as any).emit('eventWithoutPayload', undefined);

    expect(spy).toBeCalledTimes(1);
    done();
  });

  test('Event with required parameter', async done => {
    // create a spy to look at events
    const spy = jest.spyOn(service, 'eventTester');

    // emit an event as well so that that can get tested. no return on event
    await (broker as any).emit('eventWithPayload', { id: '1234' });

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
      sudoCall
    );

    expect(entityId).toBeTruthy();
    done();
  });

  test('Test database entity update', async done => {
    // create a sample entity
    const responseWithId = await broker.call(
      '{{serviceName}}.addTestEntity',
      {
        aKey: 'A Key',
        aValue: 'A Value'
      },
      sudoCall
    );

    expect(responseWithId).toMatchObject({ id: expect.stringMatching(/\w+/) });

    const updatedEntityId = await broker.call(
      '{{serviceName}}.editTestEntity',
      {
        id: responseWithId.id,
        aKey: 'Another Key',
        aValue: 'Another Value'
      },
      sudoCall
    );

    expect(updatedEntityId).toStrictEqual({ ok: true });

    done();
  });
  {{/if}}
});

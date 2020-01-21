import { TypedServiceBroker } from 'moleculer-service-ts'; // eslint-disable-line import/extensions
import { ServiceBroker as UntypedServiceBroker } from 'moleculer';

import {
  ServiceAction,
  ServiceEvent,
  ServiceName
} from '../src/service.types/index'; // eslint-disable-line import/extensions
import sampleService from '../src/sample.service'; // eslint-disable-line import/extensions

describe('{{projectName}}', () => {
  // create a typed service broker
  const typedBroker: TypedServiceBroker<
    ServiceAction,
    ServiceEvent,
    ServiceName
  > = new TypedServiceBroker<
    ServiceAction,
    ServiceEvent,
    ServiceName
  >({ logLevel: 'info', namespace: 'typed-broker' });

  // create and untyped service broker to call actions and emit events that Typescript won't allow
  const untypedBroker: UntypedServiceBroker = new UntypedServiceBroker(
    { logLevel: 'info', namespace: 'untyped-broker' }
  );

  beforeAll(async () => {
    typedBroker.createService(sampleService);
    untypedBroker.createService(sampleService);
    await typedBroker.start();
    await untypedBroker.start();
  });

  afterAll(async () => {
    typedBroker.destroyService(sampleService);
    untypedBroker.destroyService(sampleService);
    await typedBroker.stop();
    await untypedBroker.stop();
  });

  test('Action without parameter', async () => {
    // emit an event as well so that that can get tested. no return on event
    typedBroker.emit('event1', undefined, 'sample');
    // Bypass moleculer-service-ts package and emit an illegal event
    untypedBroker.emit('event1', { id: '1234' });

    // call an action without a parameter object
    const response: string = await typedBroker.call('sample.hello');
    expect(response).toBe('Hello Byte!');
  });

  test('Action with required parameter', async () => {
    // emit an event as well so that that can get tested. no return on event
    typedBroker.emit('event2', { id: '1234' });
    // Bypass moleculer-service-ts package and emit an illegal event
    untypedBroker.emit('event2');

    // call an action with a parameter object
    const response: string = await typedBroker.call(
      'sample.welcome',
      {
        name: 'John Doe'
      },
      { caller: 'mocha' }
    );
    expect(response).toBe('Welcome John Doe!');
  });

  test('Action with missing required parameter', async () => {
    // call action without required parameters
    await expect(
      untypedBroker.call('sample.welcome')
    ).rejects.toThrow('Parameters validation error!');
  });
});

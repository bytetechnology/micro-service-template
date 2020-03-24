/* eslint-disable class-methods-use-this */
/**
 * {{capitalizedServiceName}} service for the Byte Technology cloud backend.
 * Uses the moleculer microservices framework.
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */

// Moleculer micro-services framework
import moleculer from 'moleculer';
import { Action, Event, Service, Method } from 'moleculer-decorators';
import { MoleculerMikroContext as CTX } from 'moleculer-context-db';

import { WelcomeParams } from './api/params/welcome.params';
import { AddTestEntityParams } from './api/params/add.test.entity.params';
import { ExampleEvent } from './api/events/example.event';
import { validateParams, validatePayload } from './lib/validate.data';
import { welcome } from './action.handlers/welcome';
import { addTestEntity } from './action.handlers/add.test.entity';
import { eventWithPayload } from './event.handlers/event.with.payload';

// Define our {{serviceName}} service
@Service({
  name: '{{serviceName}}'
})
export class {{capitalizedServiceName}}Service extends moleculer.Service {
  dbUri: string | undefined = undefined;

  dbName: string | undefined = undefined;

  // Our actions
  @Action()
  ping(/* ctx: CTX */) {
    return `Hello Byte!`;
  }

  @Action()
  welcome(ctx: CTX<WelcomeParams>) {
    validateParams(ctx, WelcomeParams);
    return welcome(ctx);
  }

  @Action()
  async addTestEntity(ctx: CTX<AddTestEntityParams>) {
    validateParams(ctx, AddTestEntityParams);
    return addTestEntity(ctx);
  }

  // Incoming events
  @Event()
  eventWithoutPayload(/* _: any, sender: string, eventName: string */) {
    // call our event tester method so that we can write unite tests for this event
    this.eventTester();
  }

  @Event()
  async eventWithPayload(
    payload: ExampleEvent,
    sender: string,
    eventName: string
  ) {
    const validPayload = validatePayload(payload, ExampleEvent);
    await eventWithPayload.call(this, validPayload, sender, eventName);

    // call our event tester method so that we can write unite tests for this event
    this.eventTester();
  }

  @Method
  eventTester(): void {} // eslint-disable-line class-methods-use-this
}

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

import { WelcomeParams, WelcomeResponse } from './api/params/welcome.params';
{{#if needDb}}
import { AddTestEntityParams, AddTestEntityResponse } from './api/params/add.test.entity.params';
import { EditTestEntityParams, EditTestEntityResponse } from './api/params/edit.test.entity.params';
{{/if}}
import { ExampleEvent } from './api/events/example.event';
import { validateParams } from './lib/validate.data';
import * as ping from './action.handlers/ping';
import { welcome } from './action.handlers/welcome';
{{#if needDb}}
import { addTestEntity } from './action.handlers/add.test.entity';
import { editTestEntity } from './action.handlers/edit.test.entity';
{{/if}}
import { eventWithPayload } from './event.handlers/event.with.payload';
import { CTX } from './lib/moleculer/broker';

// Define our {{serviceName}} service
@Service({
  name: '{{serviceName}}',
  version: process.env.npm_package_version,
  settings: { $noVersionPrefix: true }
})
export class {{capitalizedServiceName}}Service extends moleculer.Service {
  // Our actions
  @Action()
  async ping(ctx: CTX): Promise<string> {
    return ping.ping(ctx);
  }

  @Action({ restricted: true })
  async pingAuth(ctx: CTX): Promise<string> {
    return ping.ping(ctx);
  }

  @Action({ restricted: true })
  async welcome(ctx: CTX<WelcomeParams>): Promise<WelcomeResponse> {
    validateParams(ctx, WelcomeParams);
    return welcome(ctx);
  }

  {{#if needDb}}
  @Action({ restricted: true })
  async addTestEntity(ctx: CTX<AddTestEntityParams>): Promise<AddTestEntityResponse> {
    validateParams(ctx, AddTestEntityParams);
    return addTestEntity(ctx);
  }

  @Action({ restricted: true })
  async editTestEntity(ctx: CTX<EditTestEntityParams>): Promise<EditTestEntityResponse> {
    validateParams(ctx, EditTestEntityParams);
    return editTestEntity(ctx);
  }
  {{/if}}
  // Incoming events
  @Event()
  eventWithoutPayload(/* _: any, sender: string, eventName: string */) {
    // call our event tester method so that we can write unite tests for this event
    this.eventTester();
  }

  @Event()
  async eventWithPayload(ctx: CTX<ExampleEvent>) {
    validateParams(ctx, ExampleEvent);
    eventWithPayload(ctx);
    // call our event tester method so that we can write unite tests for this event
    this.eventTester();
  }

  @Method
  eventTester(): void {} // eslint-disable-line class-methods-use-this
}

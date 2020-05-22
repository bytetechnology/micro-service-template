/**
 * Important:
 * - Do not rename file.
 * - Do not rename exported types.
 * - File used by ./lib/moleculer/broker.ts
 *
 * Should contain api of current service and others.
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */
import {
  GenericEventWithoutPayload as EventNoData,
  GenericEventWithPayload as Event
} from 'moleculer-service-ts';
{{#if needDb}}
import { MoleculerMikroContext as MCTX } from 'moleculer-context-db';
{{/if}}
{{#unless needDb}}
import { Context as MCTX } from 'moleculer';
{{/unless}}
import * as jf from 'joiful';

import { {{capitalizedServiceName}}Action, {{capitalizedServiceName}}Name } from './api';
import { broker } from './lib/moleculer/broker';
import { ExampleEvent } from './api/events/example.event';

export type ServiceName = {{capitalizedServiceName}}Name;

// Add other services types here, eg;
// export type ServiceAction = DiscountActions | UserActions | IotActions;
export type ServiceAction = {{capitalizedServiceName}}Action;

// These are the events we emit
export type ServiceEvent =
  | EventNoData<'eventWithoutPayload'>
  | Event<'eventWithPayload', ExampleEvent>;

export class AuthTokenPayload {
  @(jf.string().required())
  userId: string = '';

  @(jf.string().required())
  clientId: string = '';

  @(jf
    .array()
    .optional()
    .items(joi => joi.string())
    .min(1)
    .unique())
  roles: string[] = [''];
}
export type ContextMeta = {
  authToken?: string;
  auth?: AuthTokenPayload;
};

export type CTX<
  P = unknown,
  M extends ContextMeta = ContextMeta
> = MCTX<P, M> & {
  broker: typeof broker;
};

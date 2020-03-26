/**
 * Important:
 * - Do not rename file.
 * - Do not rename exported types.
 * - File used by ./lib/moleculer/broker.ts
 *
 * Should contain api of current service and others.
 *
 * Copyright Byte Technology 2019. All rights reserved.
 */
import {
  GenericEventWithoutPayload as EventNoData,
  GenericEventWithPayload as Event
} from 'moleculer-service-ts';
import { Actions as XxxActions } from './api';
import { ExampleEvent } from './api/events/example.event';

export type ServiceName = 'xxx';

// Add other services types here, eg;
// export type ServiceAction = DiscoutActions | UserActions | IotActions;
export type ServiceAction = XxxActions;

// These are the events we emit
export type ServiceEvent =
  | EventNoData<'eventWithoutPayload'>
  | Event<'eventWithPayload', ExampleEvent>;

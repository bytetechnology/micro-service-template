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
import { Actions as {{capitalizedServiceName}}Actions, Name } from './api';
import { ExampleEvent } from './api/events/example.event';

export type ServiceName = Name;

// Add other services types here, eg;
// export type ServiceAction = DiscoutActions | UserActions | IotActions;
export type ServiceAction = {{capitalizedServiceName}}Actions;

// These are the events we emit
export type ServiceEvent =
  | EventNoData<'eventWithoutPayload'>
  | Event<'eventWithPayload', ExampleEvent>;

/**
 * Definition for ./lib/service.broker.ts
 * Should contain api of current service.
 * Can contain any number of external services api.
 *
 * Copyright Byte Technology 2019. All rights reserved.
 */
import {
  GenericEventWithoutPayload as EventNoData,
  GenericEventWithPayload as Event
} from 'moleculer-service-ts';
import { Actions as {{capitalizedServiceName}}Actions } from './api';
import { ExampleEvent } from './api/events/example.event';

export type ServiceName = '{{serviceName}}';

// Add other services types here, eg;
// export type ServiceAction = DiscoutActions | UserActions | IotActions;
export type ServiceAction = {{capitalizedServiceName}}Actions;

// These are the events we emit
export type ServiceEvent =
  | EventNoData<'eventWithoutPayload'>
  | Event<'eventWithPayload', ExampleEvent>;

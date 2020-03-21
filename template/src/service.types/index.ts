/**
 * All our known service action and event types.
 *
 * Copyright Byte Technology 2019. All rights reserved.
 */

import {
  ServiceAction as {{capitalizedServiceName}}Action,
  ServiceEvent as {{capitalizedServiceName}}Event,
  ServiceName as {{capitalizedServiceName}}Name
} from './{{serviceName}}.service.types'; // eslint-disable-line import/extensions

// Build our union of all service names
export type ServiceName = {{capitalizedServiceName}}Name;
// Build our union of all action types
export type ServiceAction = {{capitalizedServiceName}}Action;
// Build our union of all event types
export type ServiceEvent = {{capitalizedServiceName}}Event;

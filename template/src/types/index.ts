/**
 * All our know service action and event types.
 *
 * Copyright Byte Technology 2019. All rights reserved.
 */

import {
  ServiceAction as SampleAction,
  ServiceEvent as SampleEvent,
  ServiceName as SampleName
} from './{{serviceName}}.service.types';

// Build our union of all service names
export type ServiceName = SampleName;
// Build our union of all action types
export type ServiceAction = SampleAction;
// Build our union of all event types
export type ServiceEvent = SampleEvent;

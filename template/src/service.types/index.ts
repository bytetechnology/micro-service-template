/**
 * All our know service action and event types.
 *
 * Copyright Byte Technology 2019. All rights reserved.
 * Author: Ujwal S. Setlur <ujwal@bytetechnology.co>
 */

import {
  ServiceAction as SampleAction,
  ServiceEvent as SampleEvent,
  ServiceName as SampleName
} from './sample.service.types'; // eslint-disable-line import/extensions

// Build our union of all service names
export type ServiceName = SampleName;
// Build our union of all action types
export type ServiceAction = SampleAction;
// Build our union of all event types
export type ServiceEvent = SampleEvent;

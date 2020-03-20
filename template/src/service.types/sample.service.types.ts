/**
 * Typescript definitions of actions supported by the {{serviceName}} service
 *
 * Copyright Byte Technology 2019. All rights reserved.
 */

import {
  GenericActionWithParameters,
  GenericActionWithoutParameters,
  GenericEventWithoutPayload,
  GenericEventWithPayload
} from 'moleculer-service-ts';

export type ServiceName = '{{serviceName}}';

export type ServiceAction =
  | GenericActionWithoutParameters<'{{serviceName}}.ping', string>
  | GenericActionWithParameters<'{{serviceName}}.welcome', { name: string }, string>
  | GenericActionWithParameters<
      '{{serviceName}}.addTestEntity',
      { aKey: string; aValue: string },
      number
    >;

// These are the events we emit
export type ServiceEvent =
  | GenericEventWithoutPayload<'eventWithoutPayload'>
  | GenericEventWithPayload<'eventWithPayload', { id: string }>;

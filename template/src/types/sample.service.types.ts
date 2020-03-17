/**
 * Typescript definitions of actions supported by the sample service
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
  | GenericActionWithParameters<
      '{{serviceName}}.welcome',
      { name: string },
      string
    >
  | GenericActionWithParameters<
      '{{serviceName}}.addUser',
      { name: string; passwordHash: string },
      number
    >;

// These are the events we emit
export type ServiceEvent =
  | GenericEventWithoutPayload<'eventWithoutPayload'>
  | GenericEventWithPayload<'eventWithPayload', { id: string }>;
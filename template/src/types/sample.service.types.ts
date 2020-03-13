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

export type ServiceName = 'sample';

export type ServiceAction =
  | GenericActionWithoutParameters<'sample.hello', string>
  | GenericActionWithParameters<'sample.welcome', { name: string }, string>
  | GenericActionWithParameters<
      'sample.addUser',
      { name: string; passwordHash: string },
      number
    >;

// These are the events we emit
export type ServiceEvent =
  | GenericEventWithoutPayload<'sample.eventWithoutPayload'>
  | GenericEventWithPayload<'sample.eventWithPayload', { id: string }>;

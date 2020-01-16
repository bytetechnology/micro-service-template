/**
 * Typescript definitions of actions supported by the sample service
 *
 * Copyright Byte Technology 2019. All rights reserved.
 * Author: Ujwal S. Setlur <ujwal@bytetechnology.co>
 */
import {
  GenericActionWithParameters,
  GenericActionWithoutParameters,
  GenericEventWithoutPayload,
  GenericEventWithPayload
} from 'moleculer-service-ts'; // eslint-disable-line import/extensions

export type ServiceName = 'sample';

export type ServiceAction =
  | GenericActionWithoutParameters<'sample.hello', string>
  | GenericActionWithParameters<
      'sample.welcome',
      { name: string },
      string
    >;

// These are the events we emit
export type ServiceEvent =
  | GenericEventWithoutPayload<'event1'>
  | GenericEventWithPayload<'event2', { id: string }>;

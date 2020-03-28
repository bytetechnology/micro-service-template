/**
 * External api for other services
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */
import {
  GenericActionWithParameters as Action,
  GenericActionWithoutParameters as ActionNoParams
} from 'moleculer-service-ts';
import { WelcomeParams } from './params/welcome.params';
import { AddTestEntityParams } from './params/add.test.entity.params';

export type Actions =
  | ActionNoParams<'{{serviceName}}.ping', string>
  | Action<'{{serviceName}}.welcome', WelcomeParams, string>
  | Action<'{{serviceName}}.addTestEntity', AddTestEntityParams, number>;

export * from './params/add.test.entity.params';
export * from './params/welcome.params';

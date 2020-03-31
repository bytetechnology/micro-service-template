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
{{#if needDb}}
import { AddTestEntityParams } from './params/add.test.entity.params';
{{/if}}

export type Actions =
  | ActionNoParams<'{{serviceName}}.ping', string>
  | Action<'{{serviceName}}.welcome', WelcomeParams, string>
{{#if needDb}}
  | Action<'{{serviceName}}.addTestEntity', AddTestEntityParams, number>;
{{/if}}

{{#if needDb}}
export * from './params/add.test.entity.params';
{{/if}}
export * from './params/welcome.params';

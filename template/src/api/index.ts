/**
 * External api for other services
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */
import {
  GenericActionWithParameters as Action,
  GenericActionWithoutParameters as ActionNoParams
} from 'moleculer-service-ts';
import { WelcomeParams, WelcomeResponse } from './params/welcome.params';
{{#if needDb}}
import { AddTestEntityParams, AddTestEntityResponse } from './params/add.test.entity.params';
import { EditTestEntityParams, EditTestEntityResponse } from './params/edit.test.entity.params';
{{/if}}

export type ServiceAction =
  | ActionNoParams<'{{serviceName}}.ping', string>
  | ActionNoParams<'{{serviceName}}.pingAuth', string>
  | Action<'{{serviceName}}.welcome', WelcomeParams, WelcomeResponse>
{{#if needDb}}
  | Action<'{{serviceName}}.addTestEntity', AddTestEntityParams, AddTestEntityResponse>
  | Action<'{{serviceName}}.editTestEntity', EditTestEntityParams, EditTestEntityResponse>
{{/if}}
;

export type ServiceName = '{{serviceName}}';
export const serviceName: ServiceName = '{{serviceName}}';

export type ServiceEvent = never;

// CASL permissions
export type AppActions = 'manage';
export type AppSubjects = 'all' | '{{serviceName}}';

{{#if needDb}}
export * from './params/add.test.entity.params';
export * from './params/edit.test.entity.params';
{{/if}}
export * from './params/welcome.params';

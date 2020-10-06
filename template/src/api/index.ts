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
import { EditTestEntityParams } from './params/edit.test.entity.params';
{{/if}}

export type ServiceAction =
  | ActionNoParams<'{{serviceName}}.ping', string>
  | Action<'{{serviceName}}.welcome', WelcomeParams, string>
{{#if needDb}}
  | Action<'{{serviceName}}.addTestEntity', AddTestEntityParams, string>
  | Action<'{{serviceName}}.editTestEntity', EditTestEntityParams, string>;
{{/if}}

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

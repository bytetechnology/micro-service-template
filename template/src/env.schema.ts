/**
 * ! Do not rename or move file.
 * ! Do not rename Env class.
 *
 * Environment variables will be validated basing on this file.
 * Example in EnvBase class.
 * Env is type for { config } from ./lib
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */
{{#if needDb}}
import { MikroORMOptions } from '@mikro-orm/core';
import * as jf from 'joiful';
{{/if}}
import { EnvBase } from './lib/env.base.schema';

{{#if needDb}}
const optional = () => jf.string().optional();
const booleanOptional = () => jf.boolean().optional();
{{/if}}

// Decorate properties using joiful validator
export class Env extends EnvBase {
  {{#if needDb}}
  // ---------------------------------------------------------------
  //  Mikro-orm db connector
  @(optional()
    .default({{#if sql}}'sqlite'{{/if}}{{#if mongo}}'mongo'{{/if}})
    .valid('mongo', 'mysql', 'mariadb', 'postgresql', 'sqlite'))
  DB_CORE__TYPE!: MikroORMOptions['type'];

  @(optional().default({{#if sql}}':memory:'{{/if}}{{#if mongo}}'{{serviceName}}db'{{/if}}))
  DB_CORE__DB_NAME!: string;

  @optional()
  DB_CORE__NAME?: string;

  {{#if sql}}
  @optional()
  {{/if}}
  {{#if mongo}}
  @(jf.string().required())
  {{/if}}
  DB_CORE__CLIENT_URL?: string;

  @optional()
  DB_CORE__USER?: string;

  @optional()
  DB_CORE__PASSWORD?: string;

  @(booleanOptional().default(false))
  DB_CORE__DEBUG?: boolean;

  // Any custom extensions of the base environemntal schema here
  {{/if}}
  {{#unless needDb}}
  // Any custom extensions of the base environemntal schema here
  {{/unless}}
}

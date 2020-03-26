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
import { MikroORMOptions } from 'mikro-orm';
import * as jf from 'joiful';
import { EnvBase } from './lib/env.base.schema';

const optional = () => jf.string().optional();

// Decorate properties using joiful validator
export class Env extends EnvBase {
  // ---------------------------------------------------------------
  //  Mikro-orm db connector
  @(optional()
    .default('sqlite')
    .valid('mongo', 'mysql', 'mariadb', 'postgresql', 'sqlite'))
  DB_CORE__TYPE!: MikroORMOptions['type'];

  @(optional().default(':memory:'))
  DB_CORE__DB_NAME!: string;

  @optional()
  DB_CORE__NAME?: string;

  @optional()
  DB_CORE__CLIENT_URL?: string;

  @optional()
  DB_CORE__USER?: string;

  @optional()
  DB_CORE__PASSWORD?: string;
}

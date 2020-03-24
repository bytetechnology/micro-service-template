import * as jf from 'joiful';
import { MikroORMOptions } from 'mikro-orm';

const optional = () => jf.string().optional();
const required = () => jf.string().required();

export class EnvBase {
  @(required().valid('production', 'development', 'test'))
  NODE_ENV!: 'production' | 'development' | 'test';

  // ---------------------------------------------------------------
  //  Moleculer broker options
  @(optional()
    .default('info')
    .valid('fatal', 'error', 'warn', 'info', 'debug', 'trace'))
  LOG_LEVEL!: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

  @(optional()
    .default('default')
    .valid('default', 'simple', 'short'))
  LOG_FORMATTER!: 'default' | 'simple' | 'short';

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

  // ---------------------------------------------------------------
  //  Tests
  @(optional().pattern(/\d+/))
  JEST_TIMEOUT?: string;
}

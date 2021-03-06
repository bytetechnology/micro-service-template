/**
 * Validation schema for env vars.
 * EnvBase is base class for config.
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */
import * as jf from 'joiful';

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

  @(optional().default('unknown'))
  HOSTNAME?: string;

  @optional()
  LOG_HOST?: string;

  @(optional().pattern(/\d+/))
  LOG_PORT?: string;

  @optional()
  MESSAGE_BROKER_HOST?: string;

  @(optional().pattern(/\d+/))
  MESSAGE_BROKER_PORT?: string;

  // Auth JWT secret
  @(optional().default('BYTE-JWT-KEY'))
  AUTH__JWT_KEY!: string;

  // ---------------------------------------------------------------
  //  Tests
  @(optional().pattern(/\d+/))
  JEST_TIMEOUT?: string;
}

/* istanbul ignore file */

// eslint-disable-next-line max-classes-per-file
/**
 * Validators for context params and event payloads.
 * Custom validation of moleculer@0.0.14 is not working.
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */

import * as jf from 'joiful';
import { Errors } from 'moleculer';
{{#if needDb}}
import { MoleculerMikroContext as CTX} from 'moleculer-context-db';
{{/if}}
{{#unless needDb}}
import { Context as CTX } from 'moleculer';
{{/unless}}
import { config } from './env';

const { MoleculerError } = Errors;

let abortEarly = false;
if (config.NODE_ENV === 'production') {
  abortEarly = true;
}

export function validateParams<TParams>(
  ctx: CTX<TParams | TParams[]>,
  Class: new () => TParams
): void {
  const { params } = ctx;
  let error;
  let value;

  if (Array.isArray(params)) {
    ({ error, value } = jf.validateArrayAsClass(params, Class, {
      abortEarly
    }));
  } else {
    ({ error, value } = jf.validateAsClass(params, Class, {
      abortEarly
    }));
  }

  if (error) {
    throw new MoleculerError(
      `Invalid params provided. ${error.message}`,
      400,
      'BAD_REQUREST',
      params
    );
  }

  // Need to reassign to params because defaults set by joiful
  ctx.params = value;
}

// eslint-disable-next-line max-classes-per-file
import * as jf from 'joiful';
import { Errors } from 'moleculer';
import { MoleculerMikroContext } from 'moleculer-context-db';
import { config } from './env';

const { MoleculerError } = Errors;

let abortEarly = false;
if (config.NODE_ENV === 'production') {
  abortEarly = true;
}

export function validateParams<TParams>(
  ctx: MoleculerMikroContext<TParams | TParams[]>,
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

export function validatePayload<T>(payload: T[], Class: new () => T): T[];
export function validatePayload<T>(payload: T, Class: new () => T): T;
export function validatePayload<T>(
  payload: T | T[],
  Class: new () => T
): T | T[] {
  let error;
  let value;

  if (Array.isArray(payload)) {
    ({ error, value } = jf.validateArrayAsClass(payload, Class, {
      abortEarly
    }));
  } else {
    ({ error, value } = jf.validateAsClass(payload, Class, {
      abortEarly
    }));
  }

  if (error) {
    throw new MoleculerError(
      `Invalid event payload received. ${error.message}`,
      500,
      'INTERNAL_SERVER_ERROR',
      payload
    );
  }

  return value;
}

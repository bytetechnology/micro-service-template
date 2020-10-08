/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { AbilityBuilder } from '@casl/ability';
{{#if needDb}}
import { EntityManager } from '@mikro-orm/core';
{{/if}}
import moment from 'moment';

import { Auth } from '@bytetech/micro-authz';
{{#if needDb}}
import { getDbConnector } from '../src/db.connector';
{{/if}}

export const managerAuth: Auth = {
  primaryClientId: 'TEST-CLIENT-ID',
  currentClientId: 'TEST-CLIENT-ID',
  userId: 'TEST-USER-ID',
  permissions: {
    rules: [{ action: 'manage', subject: 'all' }]
  }
};
{{#if needDb}}
export async function getEm(): Promise<EntityManager> {
  const dbc = await getDbConnector();
  const { em } = dbc.getORM();

  return em as any;
}

export async function resetServiceDB(): Promise<void> {
  const dbConnector = await getDbConnector();

  await dbConnector.getORM().getSchemaGenerator().dropSchema();
  await dbConnector.getORM().getSchemaGenerator().createSchema();
}
{{/if}}

export function createAuth(
  abilitiesFn: (abilityBuilder: AbilityBuilder<any>) => void,
  opts?: { userId?: string; clientId?: string; roles?: string[] }
): Auth {
  const abilityBuilder = new AbilityBuilder<any>();

  abilitiesFn(abilityBuilder);

  return {
    userId: opts?.userId || 'default-user-id',
    primaryClientId: opts?.clientId || 'default-client-id',
    currentClientId: opts?.clientId || 'default-client-id',
    permissions: {
      rules: abilityBuilder.rules as any
    }
  };
}

export type TimeUnit = moment.unitOfTime.Base;

function resolveArgsOfFutureAndPastFunctions(...args: any[]) {
  let from: Date;
  let amount: number;
  let unit: TimeUnit;

  if (args.length === 2) {
    from = new Date();
    // eslint-disable-next-line prefer-destructuring
    amount = args[0];
    // eslint-disable-next-line prefer-destructuring
    unit = args[1];
  } else {
    // eslint-disable-next-line prefer-destructuring
    from = args[0];
    // eslint-disable-next-line prefer-destructuring
    amount = args[1];
    // eslint-disable-next-line prefer-destructuring
    unit = args[2];
  }

  return { from, amount, unit };
}

export function now(): Date {
  return new Date();
}

export function future(amount: number, unit: TimeUnit): Date;
// eslint-disable-next-line no-redeclare
export function future(from: Date, amount: number, unit: TimeUnit): Date;
// eslint-disable-next-line no-redeclare
export function future(...args: any[]): Date {
  const { from, amount, unit } = resolveArgsOfFutureAndPastFunctions(...args);

  return moment(from.getTime()).add(amount, unit).toDate();
}

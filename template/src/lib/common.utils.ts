/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { Ability, subject as createCaslSubject } from '@casl/ability';
import { Errors } from 'moleculer';
import { inspect } from 'util';
{{#if needDb}}
import { Collection } from '@mikro-orm/core';
{{/if}}
import { RuleCondition, ContextMeta, Auth } from '@bytetech/micro-authz';
import { CTX } from '../service.types';
import { AppActions, AppSubjects, serviceName } from '../api';

export const { MoleculerError } = Errors;

{{#if needDb}}
type StringOnly<T> = T extends string ? T : never;

// User for entities to omit Collections from constructor
export type CollectionsNames<Base extends object> = StringOnly<
  keyof Pick<
    Base,
    {
      [Key in keyof Base]: Base[Key] extends Collection<any> ? Key : never;
    }[keyof Base]
  >
>;

export function getDbPagination(args: { page: number; pageLength: number }) {
  const { page, pageLength } = args;

  return {
    offset: page * pageLength,
    limit: pageLength
  };
}
{{/if}}

// Keep it for future
// export function pick<T extends object, K extends keyof T>(
//   obj: T,
//   keys: K[]
// ): { [Key in K]: T[Key] };
// export function pick<T extends null | undefined, K extends string>(
//   obj: T,
//   keys: K[]
// ): null;
// export function pick<T extends object | null | undefined, K extends keyof T>(
//   obj: T,
//   keys: K[]
// ): { [Key in K]: T[Key] } | null {
//   if (obj === null || obj === undefined) {
//     return null;
//   }
//   return Object.entries(obj as { [key: string]: any })
//     .filter(([key]) => keys.includes(key as any))
//     .reduce((o, [key, val]) => Object.assign(o, { [key]: val }), {}) as any;
// }

// -----------------------------------------------------

export const ANY_VALUE = Symbol('ANY_VALUE');

type Conditions = {
  [K in keyof RuleCondition]: RuleCondition[K] | undefined | typeof ANY_VALUE;
};

// eslint-disable-next-line import/export
export function authorize(ctx: CTX) {
  return {
    throwIfUser() {
      return {
        cannot(action: AppActions, subject: AppSubjects) {
          return {
            where(conditions: Conditions): void {
              const { auth } = ctx.meta as Required<ContextMeta>; // At this point, we should be authorized

              if (!auth) {
                throw new MoleculerError(`Unauthorized`, 401);
              }

              const ability = new Ability<[AppActions, AppSubjects]>(
                auth.permissions?.rules as any
              );

              const normalizedConditions: any = {};
              // eslint-disable-next-line no-restricted-syntax
              for (const [key, value] of Object.entries(conditions)) {
                if (value !== undefined && value !== ANY_VALUE) {
                  normalizedConditions[key] = value;
                }
              }

              const caslSubject = createCaslSubject<AppSubjects, Conditions>(
                subject,
                normalizedConditions
              );

              if (ability.cannot(action, caslSubject as any)) {
                const where = Object.entries(conditions)
                  .map(
                    ([key, value]) =>
                      `${key}=${value === ANY_VALUE ? `*` : `'${value}'`}`
                  )
                  .join('" and "');

                throw new MoleculerError(
                  `User not allowed to "${action}" "${subject}"${
                    where ? ` where "${inspect(where)}"` : ``
                  }.`,
                  403
                );
              }
            }
          };
        }
      };
    },
    doesUser<T extends object>() {
      return {
        can(action: AppActions, subject: AppSubjects) {
          return {
            where(conditions: T): boolean {
              const { auth } = ctx.meta as Required<ContextMeta>; // At this point, we should be authorized

              if (!auth) {
                throw new MoleculerError(`Unauthorized`, 401);
              }

              const ability = new Ability<[AppActions, AppSubjects]>(
                auth.permissions?.rules as any
              );

              const caslDiscount = createCaslSubject<AppSubjects, T>(
                subject,
                conditions
              );

              return ability.can(action, caslDiscount as any);
            }
          };
        }
      };
    }
  };
}

export const sudoAuth: Auth = {
  primaryClientId: `${serviceName.toUpperCase()}-SERVICE`,
  currentClientId: `${serviceName.toUpperCase()}-SERVICE`,
  userId: `${serviceName.toUpperCase()}-SERVICE`,
  permissions: {
    rules: [{ action: 'manage', subject: 'all' }]
  }
};

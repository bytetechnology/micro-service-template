/**
 * Middleware for athenticating a jwt
 * Copyright Byte Technology 2020. All rights reserved.
 */
import Moleculer from 'moleculer';
import * as jf from 'joiful';
import { Auth } from '@bytetech/micro-authz';

import { CTX } from '../lib/moleculer/broker';
import { MoleculerError } from '../lib/common.utils';

export const authenticateMoleculerContext = (ctx: CTX): void => {
  if (!ctx.meta.auth) {
    throw new MoleculerError(`Missing meta.auth`, 401, 'UNAUTHORIZED');
  }

  const { error } = jf.validateAsClass(ctx.meta.auth, Auth);
  if (error) {
    throw new MoleculerError(
      `Invalid meta.auth. Details: ${error}`,
      401,
      'UNAUTHORIZED',
      ctx.meta.auth
    );
  }
};

export function getAuthMiddleware(authenticator: (ctx: CTX) => void) {
  const AuthMiddleware: Moleculer.Middleware = {
    localAction(
      next: Moleculer.ActionHandler,
      action: Moleculer.ServiceActionsSchema
    ) {
      // If action is restricted, authenticate
      if (action.restricted === true) {
        return function authAction(this: Moleculer.ServiceBroker, ctx: CTX) {
          authenticator(ctx);
          return next(ctx);
        };
      }

      // Otherwise, just return handler
      return next;
    }
  };

  return AuthMiddleware;
}

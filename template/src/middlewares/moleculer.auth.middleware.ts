/**
 * Middleware for athenticating a jwt
 * Copyright Byte Technology 2020. All rights reserved.
 */
import Moleculer from 'moleculer';

import { CTX } from '../service.types';
import { verifyAuthToken } from '../app/auth.token';

export const authenticateMoleculerContext = (ctx: CTX): void => {
  if (!(ctx.meta && ctx.meta.authToken)) {
    throw new Moleculer.Errors.MoleculerError(`Missing authToken!`, 401);
  }

  const auth = verifyAuthToken(ctx.meta.authToken);

  ctx.meta.auth = auth;
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

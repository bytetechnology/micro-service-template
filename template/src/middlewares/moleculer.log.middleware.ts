/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import Moleculer, { Context } from 'moleculer';

export function getLogMiddleware(logFunction: (...args: any[]) => any) {
  const LogMiddleware: Moleculer.Middleware = {
    localAction(next: (ctx: Context) => void) {
      return function logAction(
        this: Moleculer.ServiceBroker,
        ctx: Moleculer.Context
      ) {
        logFunction(
          `Action '${(ctx.action as any).name}'. Caller '${ctx.caller}'`
        );
        return next(ctx);
      };
    },
    localEvent(next: (ctx: Context) => void) {
      return function logEvent(ctx: Context) {
        logFunction(
          `Event ${ctx.eventName}. From service ${
            ctx.caller || 'UNKNOWN (moleculer-cli)'
          }. Data =`,
          ctx.params
        );
        return next(ctx);
      };
    }
  };

  return LogMiddleware;
}

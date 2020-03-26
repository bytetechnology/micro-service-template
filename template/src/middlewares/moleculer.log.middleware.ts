import Moleculer from 'moleculer';

export function getLogMiddleware(logFunction: (...args: any[]) => any) {
  const LogMiddleware: Moleculer.Middleware = {
    localAction(next: any) {
      return function logAction(
        this: Moleculer.ServiceBroker,
        ctx: Moleculer.Context
      ) {
        logFunction(
          `Action '${(ctx.action as any).name}'.  '${
            ctx.caller
          }'. CallerNode '${ctx.nodeID}'.`
        );
        return next(ctx);
      };
    },
    localEvent(next: any, event: Moleculer.EventSchema) {
      return function logEvent(
        payload: any,
        sender: string,
        eventName: string
      ) {
        logFunction(`Event ${event.name}. From service '${sender}'`);
        return next(payload, sender, eventName);
      };
    }
  };

  return LogMiddleware;
}

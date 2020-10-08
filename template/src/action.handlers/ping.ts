import { CTX } from '../service.types';

export async function ping(ctx: CTX): Promise<string> {
  ctx.broker.logger.debug(`ping`, ctx);
  return 'Hello Byte!';
}

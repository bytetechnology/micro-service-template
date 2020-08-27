/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { CTX } from '../lib/moleculer/broker';
import { ExampleEvent } from '../api/events/example.event';

export function eventWithPayload(ctx: CTX<ExampleEvent>) {
  ctx.broker.logger.info(
    `eventWithPayload received id=${ctx.params.id} from ${ctx.nodeID}, name ${ctx.eventName}`
  );
}

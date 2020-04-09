/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
{{#if needDb}}
import { MoleculerMikroContext as CTX } from 'moleculer-context-db';
{{/if}}
{{#unless needDb}}
import { Context as CTX } from 'moleculer';
{{/unless}}
import { ExampleEvent } from '../api/events/example.event';

export function eventWithPayload(ctx: CTX<ExampleEvent>) {
  ctx.broker.logger.info(
    `eventWithPayload received id=${ctx.params.id} from ${ctx.nodeID}, name ${ctx.eventName}`
  );
}

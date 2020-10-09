/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { TypedServiceBroker } from 'moleculer-service-ts';
import { ContextMeta } from '@bytetech/micro-authz';
{{#if needDb}}
import { MoleculerMikroContext as MCTX } from 'moleculer-context-db';
{{/if}}
{{#unless needDb}}
import { Context as MCTX } from 'moleculer';
{{/unless}}

import { brokerConfig } from './broker.config';
import { ServiceAction, ServiceEvent, ServiceName } from '../../service.types';

export const broker: TypedServiceBroker<
  ServiceAction,
  ServiceEvent,
  ServiceName,
  ContextMeta
> = new TypedServiceBroker(brokerConfig);

export type CTX<P = unknown, M extends ContextMeta = ContextMeta> = MCTX<
  P,
  M
> & {
  broker: typeof broker;
};

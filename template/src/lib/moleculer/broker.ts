/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { TypedServiceBroker } from 'moleculer-service-ts';
import { ContextMeta } from '@bytetech/authz-api';
{{#if needDb}}
import { MoleculerMikroContext as MCTX } from 'moleculer-context-db';
{{/if}}
{{#unless needDb}}
import { Context as MCTX } from 'moleculer';
{{/unless}}

import { brokerConfig } from './broker.config';
import { ServiceActions, ServiceEvents, ServiceName } from '../../service.types';

export const broker: TypedServiceBroker<
  ServiceActions,
  ServiceEvents,
  ServiceName,
  ContextMeta
> = new TypedServiceBroker(brokerConfig);

export type CTX<P = unknown, M extends ContextMeta = ContextMeta> = MCTX<
  P,
  M
> & {
  broker: typeof broker;
};

/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { TypedServiceBroker } from 'moleculer-service-ts';
{{#if needDb}}
import { MoleculerMikroContext as MCTX } from 'moleculer-context-db';
{{/if}}
{{#unless needDb}}
import { Context as MCTX } from 'moleculer';
{{/unless}}

import { brokerConfig } from './broker.config';
import {
  ServiceAction,
  ServiceEvent,
  ServiceName
} from '../../service.types';
import { AuthTokenPayload } from '../auth.token';

export type ContextMeta = {
  authToken?: string;
  auth?: AuthTokenPayload;
};

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

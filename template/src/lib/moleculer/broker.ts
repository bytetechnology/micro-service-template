/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { TypedServiceBroker } from 'moleculer-service-ts';
import { brokerConfig } from './broker.config';
import {
  ContextMeta,
  ServiceAction,
  ServiceEvent,
  ServiceName
} from '../../service.types';

export const broker: TypedServiceBroker<
  ServiceAction,
  ServiceEvent,
  ServiceName,
  ContextMeta
> = new TypedServiceBroker(brokerConfig);

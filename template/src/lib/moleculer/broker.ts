import { TypedServiceBroker } from 'moleculer-service-ts';
import { brokerConfig } from './broker.config';
import { ServiceAction, ServiceEvent, ServiceName } from '../../service.types';

export const broker: TypedServiceBroker<
  ServiceAction,
  ServiceEvent,
  ServiceName
> = new TypedServiceBroker(brokerConfig);

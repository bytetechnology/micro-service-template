import { BrokerOptions } from 'moleculer';
import { defaultBrokerConfig } from './defaut.broker.config';

const brokerConfig: BrokerOptions =
  process.env.NODE_ENV !== 'test' ? defaultBrokerConfig : {};

// override defaults
// TODO use env module
brokerConfig.logLevel = process.env.LOG_LEVEL as any || brokerConfig.logLevel;

export { brokerConfig };

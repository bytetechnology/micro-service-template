/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { BrokerOptions } from 'moleculer';
import { byteBrokerConfig } from './byte.broker.config';
import { config } from '../env';

// eslint-disable-next-line import/no-mutable-exports
let brokerConfig: BrokerOptions = byteBrokerConfig;

if (config.NODE_ENV === 'test') {
  brokerConfig = {
    logLevel: byteBrokerConfig.logLevel
  };
}

export { brokerConfig };

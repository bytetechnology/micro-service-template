/* istanbul ignore file */

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

// if we run directly on host instead of container ecosystem, don't require rabbitmq and graylog. Easier to develop
if (process.env.DEV_HOST === 'host') {
  byteBrokerConfig.transporter = 'TCP'; // uses gossip protocol based transporter instead of rabbitmq
  brokerConfig.logger = {
    // use only console logger
    type: 'Console',
    options: {
      level: config.LOG_LEVEL,
      colors: true,
      moduleColors: false,
      formatter: 'full',
      objectPrinter: null,
      autoPadding: false
    }
  };
}

export { brokerConfig };

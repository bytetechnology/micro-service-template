/**
 * Entry point for the API service of the Byte Technology cloud backend.
 * Uses the moleculer microservices framework.
 *
 * Copyright Byte Technology 2019. All rights reserved.
 * Author: Ujwal S. Setlur <ujwal@bytetechnology.co>
 */

import { TypedServiceBroker } from 'moleculer-service-ts';

// Our stuff
import SampleService from './sample.service'; // eslint-disable-line import/extensions
import moleculerBrokerConfig from './moleculer.broker.config'; // eslint-disable-line import/extensions

// Import our service names, actions, and events
import {
  ServiceAction,
  ServiceEvent,
  ServiceName
} from './service.types/index'; // eslint-disable-line import/extensions

// Create our moleculer service broker
const moleculerBroker: TypedServiceBroker<
  ServiceAction,
  ServiceEvent,
  ServiceName
> = new TypedServiceBroker<ServiceAction, ServiceEvent, ServiceName>(
  moleculerBrokerConfig
);

// Create our service
moleculerBroker.createService(SampleService);

// Start the broker and go into in REPL mode for non-production environments
moleculerBroker.start().then(() => {
  if (process.env.NODE_ENV !== 'production') {
    moleculerBroker.repl();
  }
});

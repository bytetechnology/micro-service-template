/**
 * Important:
 * - Do not rename file.
 * - Do not rename exported types.
 * - File used by ./lib/moleculer/broker.ts
 *
 * Should contain api of current service and others.
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */
import {
  ServiceName,
  ServiceAction as {{capitalizedServiceName}}Actions,
  ServiceEvent as {{capitalizedServiceName}}Events
} from './api';
import { broker } from './lib/moleculer/broker';

export type { ServiceName };

// Add other services types here, eg;
// export type ServiceAction = DiscountActions | UserActions | IotActions;
export type ServiceAction = {{capitalizedServiceName}}Actions;

// These are the events we emit
export type ServiceEvent = {{capitalizedServiceName}}Events;

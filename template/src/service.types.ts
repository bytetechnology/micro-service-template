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
  ServiceAction as {{capitalizedCamelCaseServiceName}}Actions,
  ServiceEvent as {{capitalizedCamelCaseServiceName}}Events
} from './api';

export type { ServiceName };

// Add other services types here, eg;
// export type ServiceAction = DiscountActions | UserActions | IotActions;
export type ServiceAction = {{capitalizedCamelCaseServiceName}}Actions;

// These are the events ONLY we emit (not related to what we listen for)
export type ServiceEvent = {{capitalizedCamelCaseServiceName}}Events;

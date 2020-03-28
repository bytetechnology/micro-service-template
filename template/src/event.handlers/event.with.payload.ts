/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { Service } from 'moleculer';
import { ExampleEvent } from '../api/events/example.event';

export function eventWithPayload(
  this: Service,
  payload: ExampleEvent,
  sender: string,
  eventName: string
) {
  this.logger.info(
    `eventWithPayload received id=${payload.id} from ${sender}, name ${eventName}`
  );
}

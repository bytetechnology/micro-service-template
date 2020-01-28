/**
 * Sample service for the Byte Technology cloud backend.
 * Uses the moleculer microservices framework.
 *
 * Copyright Byte Technology 2019. All rights reserved.
 * Author: Ujwal S. Setlur <ujwal@bytetechnology.co>
 */

// Moleculer micro-services framework
import moleculer, { Errors } from 'moleculer';
import { Action, Event, Service } from 'moleculer-decorators';
import Validator, { ValidationError } from 'fastest-validator';

const validator = new Validator();
const eventSchema = { id: 'string' };
const eventSchemaCheck = validator.compile(eventSchema);

// Define our sample service
@Service({
  // Our service name
  name: 'sample'
})
class SampleService extends moleculer.Service {
  // Our actions
  @Action()
  hello(ctx: moleculer.Context) {
    this.logger.info(`hello got called from ${ctx.nodeID}`);
    return `Hello Byte!`;
  }

  @Action({
    cache: false,
    params: {
      name: 'string'
    }
  })
  welcome(ctx: moleculer.Context<{ name: string }>) {
    this.logger.info(
      `welcome got called from ${ctx.nodeID}, service: ${ctx.caller}`
    );
    return `Welcome ${ctx.params.name}!`;
  }

  @Event() eventWithoutPayload(
    payload: never,
    sender: string,
    eventName: string
  ) {
    if (payload) {
      this.logger.error(
        `Validation check failed! event ${eventName} does not take any payload!`
      );
      throw new Errors.ValidationError(
        'Event parameter check failed',
        'ERR_VALIDATION',
        payload
      );
    }

    this.logger.info(`Got event ${eventName} from sender ${sender};`);
  }

  @Event() eventWithPayload(
    payload: typeof eventSchema,
    sender: string,
    eventName: string
  ) {
    const schemaCheck: boolean | ValidationError[] = eventSchemaCheck(
      payload
    );
    if (schemaCheck !== true) {
      throw new Errors.ValidationError(
        'Event parameter check failed',
        'ERR_VALIDATION',
        schemaCheck
      );
    }

    this.logger.info(
      `Got event ${eventName} from sender ${sender}; id: ${payload.id}`
    );
  }
}

export default SampleService;

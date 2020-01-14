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

let validator = new Validator();
let eventSchema = { id: 'string' };
let eventSchemaCheck = validator.compile(eventSchema);

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

  @Event({ group: 'sampleGroup' }) sampleEvent(
    payload: typeof eventSchema,
    sender: string,
    eventName: string
  ) {
    let schemaCheck: boolean | ValidationError[] = eventSchemaCheck(
      payload
    );
    if (schemaCheck !== true) {
      this.logger.error(
        'Validation check failed! ' +
          JSON.stringify(
            schemaCheck.map(data => Object.assign(data, {}))
          )
      );
      throw new Errors.ValidationError(
        'Event parameter check failed',
        'ERR_VALIDATION',
        schemaCheck.map(data => Object.assign(data, {}))
      );
    }

    this.logger.info(
      `Got event ${eventName} from sender ${sender}; id: ${payload.id}`
    );
  }
}

export default SampleService;

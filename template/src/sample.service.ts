/**
 * Sample service for the Byte Technology cloud backend.
 * Uses the moleculer microservices framework.
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */

// Moleculer micro-services framework
import moleculer from 'moleculer';
import { Action, Event, Service, Method } from 'moleculer-decorators';
import { MoleculerMikroContext } from 'moleculer-context-db';

import { User } from './entities/user.entity';

// Define our sample service
@Service({
  name: '{{serviceName}}'
})
class {{capitalizedServiceName}}Service extends moleculer.Service {
  dbUri: string | undefined = undefined;

  dbName: string | undefined = undefined;

  // Our actions
  @Action()
  ping(ctx: moleculer.Context) {
    this.logger.info(`ping got called from ${ctx.nodeID}`);
    return `Hello Byte!`;
  }

  @Action({
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

  @Action({
    params: {
      name: 'string',
      passwordHash: 'string'
    }
  })
  async addUser(
    ctx: MoleculerMikroContext<{ name: string; passwordHash: string }>
  ) {
    this.logger.info(
      `addUser got called from ${ctx.nodeID}, service: ${ctx.caller}`
    );
    const em = ctx.entityManager;
    const user = new User(ctx.params.name, ctx.params.passwordHash);
    await em.persistAndFlush([user]);
    return user.id;
  }

  // Our events
  @Event()
  'eventWithoutPayload'(
    _: any,
    sender: string,
    eventName: string
  ) {
    this.logger.info(`Got event ${eventName} from sender ${sender};`);

    // call our event tester method so that we can write unite tests for this event
    this.eventTester();
  }

  @Event({
    params: {
      id: 'string'
    }
  })
  'eventWithPayload'(
    payload: { id: string },
    sender: string,
    eventName: string
  ) {
    this.logger.info(
      `Got event ${eventName} from sender ${sender}; id: ${payload.id}`
    );

    // call our event tester method so that we can write unite tests for this event
    this.eventTester();
  }

  @Method
  eventTester(): void {} // eslint-disable-line class-methods-use-this
}

export default {{capitalizedServiceName}}Service;

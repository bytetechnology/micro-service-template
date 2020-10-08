/**
 * Implementation of {{serviceName}}.welcome action
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { CTX } from '../lib/moleculer/broker';
import { authorize } from '../lib/common.utils';
import { WelcomeParams, WelcomeResponse } from '../api/params/welcome.params';
import { exact } from '../lib/type.utils';

/**
 * An action that returns a welcome message
 */
export async function welcome(ctx: CTX<WelcomeParams>): Promise<WelcomeResponse> {
  authorize(ctx)
    .throwIfuser()
    .cannot('welcome', '{{serviceName}}')
    .where({ clientId: 'client you want to welcome' });

  // Use this suntax to ensure that response do not contains additional properties
  const response = {
    greetings: `Welcome ${ctx.params.name}; caller: ${ctx.caller}!`
  }

  return exact<WelcomeResponse, typeof response>(response);
}

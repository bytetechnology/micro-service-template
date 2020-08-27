/**
 * Implementation of {{serviceName}}.welcome action
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { CTX } from '../lib/moleculer/broker';

import { WelcomeParams } from '../api/params/welcome.params';

/**
 * An action that returns a welcome message
 */
export async function welcome(ctx: CTX<WelcomeParams>) {
  return `Welcome ${ctx.params.name}; caller: ${ctx.caller}!`;
}

/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { MoleculerMikroContext as CTX } from 'moleculer-context-db';
import { WelcomeParams } from '../api/params/welcome.params';

export async function welcome(ctx: CTX<WelcomeParams>) {
  return `Welcome ${ctx.params.name}!`;
}

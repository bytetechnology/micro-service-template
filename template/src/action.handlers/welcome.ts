/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
{{#if needDb}}
import { MoleculerMikroContext as CTX } from 'moleculer-context-db';
{{/if}}
{{#unless needDb}}
import { Context as CTX } from 'moleculer';
{{/unless}}
import { WelcomeParams } from '../api/params/welcome.params';

export async function welcome(ctx: CTX<WelcomeParams>) {
  return `Welcome ${ctx.params.name}!`;
}

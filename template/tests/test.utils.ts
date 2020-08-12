/**
 * Copyright Byte Technology 2020. All rights reserved.
 */

import { AbilityBuilder } from '@casl/ability';

import {
  AppAbility,
  AuthTokenPayload,
  CaslAbility,
  createAuthToken
} from '../src/lib/auth.token';
import { AppActions } from '../src/api';

export function createTestAuthToken(opts: {
  userCan: AppActions[];
  userId?: string;
  clientId?: string;
}) {
  const { userCan, userId = 'user', clientId } = opts;

  const { can, rules } = new AbilityBuilder<AppAbility>();

  userCan.forEach(action => can(action, '{{serviceName}}', { clientId }));

  const tokenPayload: AuthTokenPayload = {
    userId,
    clientId: clientId || 'client',
    abilities: rules as CaslAbility[]
  };

  return createAuthToken(tokenPayload);
}

export const managerAuthToken = createTestAuthToken({ userCan: ['manage'] });

export function authTokenBasingOnAbilities(
  abilitiesFn: (abilityBuilder: AbilityBuilder<AppAbility>) => void,
  opts?: { userId?: string; clientId?: string }
): string {
  const abilityBuilder = new AbilityBuilder<AppAbility>();

  abilitiesFn(abilityBuilder);

  const tokenPayload: AuthTokenPayload = {
    userId: opts?.userId || 'default-user-id',
    clientId: opts?.clientId || 'default-client-id',
    abilities: abilityBuilder.rules as CaslAbility[]
  };

  return createAuthToken(tokenPayload);
}

/**
 * Auth token unit tests
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */

import { createAuthToken, verifyAuthToken } from '../../src/lib/auth.token';
import { managerAuthToken } from '../test.utils';
import { config } from '../../src/lib/env';

describe('Authentication JWT unit tests', () => {
  test('Basic token generation and validation', async done => {
    const payloadOut = verifyAuthToken(managerAuthToken);

    expect(payloadOut).toBeTruthy();

    done();
  });

  test('Illegal token structure', async done => {
    const payloadIn = {
      foo: 'bar',
      clientId: 'client',
      roles: ['admin']
    };

    const token = createAuthToken(payloadIn as any);
    expect(token).toBeString();

    expect(() => verifyAuthToken(token)).toThrow();

    done();
  });

  test('Illegal key', async done => {
    const jwtKey = config.AUTH__JWT_KEY;

    config.AUTH__JWT_KEY = 'an-illegal-key';

    const payloadIn = {
      foo: 'bar',
      clientId: 'client',
      roles: ['admin']
    };

    const token = createAuthToken(payloadIn as any);
    expect(token).toBeString();

    config.AUTH__JWT_KEY = jwtKey;
    expect(() => verifyAuthToken(token)).toThrow();

    done();
  });
});

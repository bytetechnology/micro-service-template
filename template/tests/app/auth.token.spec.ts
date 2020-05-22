/**
 * Auth token unit tests
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */

import { createAuthToken, verifyAuthToken } from '../../src/app/auth.token';
import { config } from '../../src/lib/env';

describe('Authentication JWT unit tests', () => {
  test('Basic token generation and validation', async done => {
    process.env.AUTH__JWT_KEY = config.AUTH__JWT_KEY;

    const payloadIn = {
      userId: 'user',
      clientId: 'client',
      roles: ['admin']
    };

    const token = createAuthToken(payloadIn);
    expect(token).toBeString();

    const payloadOut = verifyAuthToken(token);

    expect(payloadOut).toStrictEqual(payloadIn);

    done();
  });

  test('Illegal token structure', async done => {
    process.env.AUTH__JWT_KEY = config.AUTH__JWT_KEY;

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
});

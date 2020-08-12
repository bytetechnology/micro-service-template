/**
 * Unit tests for authentication middleware
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */
import {
  authenticateMoleculerContext,
  getAuthMiddleware
} from '../../src/middlewares/moleculer.auth.middleware';
import { ContextMeta, CTX } from '../../src/service.types';
import { managerAuthToken } from '../test.utils';

describe('Auth middleware unit tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Auth middleware dummy coverage test', async done => {
    const auth = jest.fn(() => {});
    const next = jest.fn(() => {});
    const restrictedAction = { restricted: true };
    const unrestrictedAction = {};
    const ctx: Partial<CTX<unknown, ContextMeta>> = {
      action: {
        name: 'TestAction'
      },
      caller: 'TestCaller',
      meta: { authToken: managerAuthToken }
    };

    const mw = getAuthMiddleware(auth);

    (mw as any).localAction(next, unrestrictedAction)(ctx);

    expect(auth).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);

    (mw as any).localAction(next, restrictedAction)(ctx);

    expect(auth).toHaveBeenCalledTimes(1);

    expect(next).toHaveBeenCalledTimes(2);
    expect(next).toHaveBeenCalledWith(ctx);

    done();
  });

  test('Auth middleware with authenticator', async done => {
    const next = jest.fn(() => {});
    const restrictedAction = { restricted: true };
    const unrestrictedAction = {};
    const ctx: Partial<CTX<unknown, ContextMeta>> = {
      action: {
        name: 'TestAction'
      },
      caller: 'TestCaller',
      meta: { authToken: managerAuthToken }
    };

    const mw = getAuthMiddleware(authenticateMoleculerContext);

    (mw as any).localAction(next, unrestrictedAction)(ctx);

    expect(next).toHaveBeenCalledTimes(1);

    (mw as any).localAction(next, restrictedAction)(ctx);

    expect(next).toHaveBeenCalledTimes(2);
    expect(next).toHaveBeenCalledWith(ctx);

    expect(ctx.meta?.auth).toBeTruthy();

    done();
  });

  test('Auth middleware with missing auth token', async done => {
    const next = jest.fn(() => {});
    const restrictedAction = { restricted: true };
    const ctx: Partial<CTX<unknown, ContextMeta>> = {
      action: {
        name: 'TestAction'
      },
      caller: 'TestCaller'
    };

    const mw = getAuthMiddleware(authenticateMoleculerContext);

    const result = () => (mw as any).localAction(next, restrictedAction)(ctx);

    expect(result).toThrow();
    expect(next).toHaveBeenCalledTimes(0);

    done();
  });
});

/**
 * Unit tests for authentication middleware
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { startAll, stopAll } from '../../src/start.stop.all';
import { broker } from '../../src/lib/moleculer/broker';
import * as ping from '../../src/action.handlers/ping';
import { sudoAuth } from '../../src/lib/common.utils';

beforeAll(async () => {
  await startAll();
});

afterAll(async () => {
  await stopAll();
});

afterEach(() => {
  jest.clearAllMocks();
});

test('Not restricted, no auth', async () => {
  const pingSpy = jest.spyOn(ping, 'ping');
  await broker.call('{{serviceName}}.ping', undefined, {});

  expect(pingSpy).toHaveBeenCalledTimes(1);
  expect(pingSpy).toHaveBeenCalledWith(expect.objectContaining({ meta: {} }));
});

test('Not restricted, with auth', async () => {
  const pingSpy = jest.spyOn(ping, 'ping');
  await broker.call('{{serviceName}}.ping', undefined, { meta: { auth: sudoAuth } });

  expect(pingSpy).toHaveBeenCalledTimes(1);
  expect(pingSpy).toHaveBeenCalledWith(
    expect.objectContaining({ meta: { auth: sudoAuth } })
  );
});

test('Restricted, no auth', async () => {
  await expect(
    broker.call('{{serviceName}}.pingAuth', undefined, {})
  ).rejects.toMatchObject({ code: 401 });
});

test('Restricted, invalid auth', async () => {
  await expect(
    broker.call('{{serviceName}}.pingAuth', undefined, {
      meta: { auth: { invalid: 'auth object' } as any }
    })
  ).rejects.toMatchObject({ code: 401 });
});

test('Not restricted, with auth', async () => {
  const pingSpy = jest.spyOn(ping, 'ping');
  await broker.call('{{serviceName}}.pingAuth', undefined, {
    meta: { auth: sudoAuth }
  });

  expect(pingSpy).toHaveBeenCalledTimes(1);
  expect(pingSpy).toHaveBeenCalledWith(
    expect.objectContaining({ meta: { auth: sudoAuth } })
  );
});

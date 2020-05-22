/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { getLogMiddleware } from '../../src/middlewares/moleculer.log.middleware';

afterEach(() => {
  jest.clearAllMocks();
});

test('Log action middleware (dummy coverage test)', async () => {
  const log = jest.fn(() => {});
  const next = jest.fn(() => {});
  const ctx = {
    action: {
      name: 'TestAction'
    },
    caller: 'TestCaller'
  };

  const mw = getLogMiddleware(log);

  expect(log).toHaveBeenCalledTimes(0);
  expect(next).toHaveBeenCalledTimes(0);

  (mw as any).localAction(next)(ctx);

  expect(log).toHaveBeenCalledTimes(1);
  expect(log).toHaveBeenCalledWith(
    `Action '${(ctx.action as any).name}'. Caller '${ctx.caller}'`
  );
  expect(next).toHaveBeenCalledTimes(1);
  expect(next).toHaveBeenCalledWith(ctx);
});

test('Log event middleware (dummy coverage test)', async () => {
  const log = jest.fn(() => {});
  const next = jest.fn(() => {});
  const event = {
    name: 'TestEvent'
  };
  const payload = 'TestPayload';
  const sender = 'TestSender';
  const eventName = 'TestEvent';

  const mw = getLogMiddleware(log);

  expect(log).toHaveBeenCalledTimes(0);
  expect(next).toHaveBeenCalledTimes(0);

  (mw as any).localEvent(next, event)(payload, sender, eventName);

  expect(log).toHaveBeenCalledTimes(1);
  expect(log).toHaveBeenCalledWith(
    `Event ${event.name}. From service '${sender}'`
  );
  expect(next).toHaveBeenCalledTimes(1);
  expect(next).toHaveBeenCalledWith(payload, sender, eventName);
});

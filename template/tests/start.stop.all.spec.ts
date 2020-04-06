/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { globalSetup, globalTearDown } from './setup';
import { startAll, stopAll } from '../src/start.stop.all';

describe('Service start/stop tests', () => {
  beforeAll(async done => {
    await globalSetup(); // should be first!
    done();
  });

  afterAll(async done => {
    await globalTearDown(); // should be last!
    done();
  });

  test('stopAll() before startAll()', async () => {
    await expect(stopAll()).rejects.toThrow();
    await startAll();
    await expect(startAll()).rejects.toThrow();
    await stopAll();
  });
});

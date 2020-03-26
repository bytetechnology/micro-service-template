import { startAll, stopAll } from '../src/start.stop.all';

test('stopAll() befre startAll()', async () => {
  await expect(stopAll()).rejects.toThrow();
  await startAll();
  await expect(startAll()).rejects.toThrow();
  await stopAll();
});

export {};

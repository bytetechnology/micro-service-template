import { startService, stopService } from '../../src/lib';

test(`Service broker should be started and stopped only once`, async () => {
  await expect(stopService()).rejects.toThrow();
  await startService();
  await expect(startService()).rejects.toThrow();
  await stopService();
});

/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
describe('getDbConnector()', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('Single call => ok', async () => {
    const { MikroConnector } = await import('moleculer-context-db');
    const { globalSetup, globalTearDown } = await import('./setup');
    const { getDbConnector } = await import('../src/db.connector');

    await globalSetup();
    const dbc = await getDbConnector();
    expect(dbc).toBeInstanceOf(MikroConnector);

    // Cleanup
    await dbc.getORM().close();
    await globalTearDown();
  });

  test('Multiple calls at once => ok', async () => {
    const { MikroConnector } = await import('moleculer-context-db');
    const { globalSetup, globalTearDown } = await import('./setup');
    const { getDbConnector } = await import('../src/db.connector');

    await globalSetup();
    const [dbc1, dbc2] = await Promise.all([
      getDbConnector(),
      getDbConnector()
    ]);

    expect(dbc1).toBeInstanceOf(MikroConnector);
    expect(dbc1).toEqual(dbc2);

    // Cleanup
    await dbc1.getORM().close();
    await globalTearDown();
  });

  test('Single call => error', async () => {
    const { getDbConnector } = await import('../src/db.connector');

    const { config } = await import('../src/lib/env');
    config.DB_CORE__TYPE = 'invalid' as any;

    await expect(getDbConnector()).rejects.toThrow();

    // Repeat to increase coverage
    await expect(getDbConnector()).rejects.toThrow();
  });

  test('Multiple calls at once => error', async () => {
    const { getDbConnector } = await import('../src/db.connector');

    const { config } = await import('../src/lib/env');
    config.DB_CORE__TYPE = 'invalid' as any;

    await expect(
      Promise.all([getDbConnector(), getDbConnector()])
    ).rejects.toThrow();

    await expect(
      Promise.all([getDbConnector(), getDbConnector()])
    ).rejects.toThrow();
  });
});

export {};

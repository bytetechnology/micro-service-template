/**
 * Entry point for Mikro-ORM naming strategy unit tests.
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */

import { TableNamingStrategy } from '../src/mikro.orm.naming.strategy';

describe('Test table naming strategy', () => {
  test('main classToTable namespace test', () => {
    const entityName = '{{serviceName}}';

    const tableName = new TableNamingStrategy().classToTableName(entityName);

    expect(tableName).toBe(entityName);
  });

  test('secondary classToTable namespace test', () => {
    const entityName = 'foo';

    const tableName = new TableNamingStrategy().classToTableName(entityName);
{{#if sql}}
    expect(tableName).toBe(`{{serviceName}}_${entityName}`);
{{/if}}
{{#if mongo}}
  expect(tableName).toBe(`{{serviceName}}-${entityName}`);
{{/if}}
  });
});

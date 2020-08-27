/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { CTX } from '../lib/moleculer/broker';
import { AddTestEntityParams } from '../api/params/add.test.entity.params';
import { TestEntity } from '../entities/index';

export async function addTestEntity(ctx: CTX<AddTestEntityParams>) {
  const em = ctx.entityManager;
  const testEntity = new TestEntity({
    aKey: ctx.params.aKey,
    aValue: ctx.params.aValue
  });
  await em.persistAndFlush([testEntity]);
  return testEntity.id;
}

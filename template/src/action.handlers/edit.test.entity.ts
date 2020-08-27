/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { CTX } from '../lib/moleculer/broker';
import { EditTestEntityParams } from '../api/params/edit.test.entity.params';
import { TestEntity } from '../entities/index';

export async function editTestEntity(ctx: CTX<EditTestEntityParams>) {
  const em = ctx.entityManager;
  const testEntity = await em.findOneOrFail<TestEntity>(TestEntity, {
    id: ctx.params.id
  });

  testEntity.aKey = ctx.params.aKey;
  testEntity.aValue = ctx.params.aValue;

  await em.flush();

  return testEntity.id;
}

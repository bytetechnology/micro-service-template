/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { CTX } from '../lib/moleculer/broker';
import {
  EditTestEntityParams,
  EditTestEntityResponse
} from '../api/params/edit.test.entity.params';
import { TestEntity } from '../entities/index';
import { exact } from '../lib/type.utils';

export async function editTestEntity(
  ctx: CTX<EditTestEntityParams>
): Promise<EditTestEntityResponse> {
  const em = ctx.entityManager;
  const testEntity = await em.findOneOrFail<TestEntity>(TestEntity, {
    id: ctx.params.id
  });

  testEntity.aKey = ctx.params.aKey;
  testEntity.aValue = ctx.params.aValue;

  await em.flush();

  const response = { ok: true };
  return exact<EditTestEntityResponse, typeof response>(response);
}

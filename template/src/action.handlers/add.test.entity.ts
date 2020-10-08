/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { CTX } from '../lib/moleculer/broker';
import {
  AddTestEntityParams,
  AddTestEntityResponse
} from '../api/params/add.test.entity.params';
import { TestEntity } from '../entities/index';
import { exact } from '../lib/type.utils';

export async function addTestEntity(
  ctx: CTX<AddTestEntityParams>
): Promise<AddTestEntityResponse> {
  const em = ctx.entityManager;

  const testEntity = new TestEntity({
    aKey: ctx.params.aKey,
    aValue: ctx.params.aValue
  });

  await em.persistAndFlush([testEntity]);

  const response = { id: testEntity.id };
  return exact<AddTestEntityResponse, typeof response>(response);
}

import { MoleculerMikroContext as CTX } from 'moleculer-context-db';
import { AddTestEntityParams } from '../api/params/add.test.entity.params';
import { TestEntity } from '../entities/test.entity';

export async function addTestEntity(ctx: CTX<AddTestEntityParams>) {
  const em = ctx.entityManager;
  const testEntity = new TestEntity(ctx.params.aKey, ctx.params.aValue);
  await em.persistAndFlush([testEntity]);
  return testEntity.id;
}

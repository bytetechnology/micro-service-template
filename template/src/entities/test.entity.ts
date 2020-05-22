/**
 * Test entity for Mikro-ORM
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */

import { Entity, Property } from 'mikro-orm';

import { BaseEntity } from './base.entity';

@Entity()
export class TestEntity extends BaseEntity {
  @Property()
  aKey!: string;

  @Property()
  aValue!: string;

  constructor(data: Omit<TestEntity, keyof BaseEntity>) {
    super();
    Object.assign(this, data);
  }
}

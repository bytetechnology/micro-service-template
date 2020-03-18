/**
 * Test entity for Mikro-ORM
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */

import { Entity, IdEntity, PrimaryKey, Property } from 'mikro-orm';

@Entity()
export class TestEntity implements IdEntity<TestEntity> {
  @PrimaryKey()
  id!: number;

  @Property()
  aKey!: string;

  @Property()
  aValue!: string;

  constructor(aKey: string, aValue: string) {
    this.aKey = aKey;
    this.aValue = aValue;
  }
}

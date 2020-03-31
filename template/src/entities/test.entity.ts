/**
 * Test entity for Mikro-ORM
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */

{{#if sql}}
import { Entity, IdEntity, PrimaryKey, Property } from 'mikro-orm';
import { v4 } from 'uuid';
{{/if}}
{{#if mongo}}
import { Entity, MongoEntity, PrimaryKey, Property, SerializedPrimaryKey } from 'mikro-orm';
import { ObjectId } from 'mongodb';
{{/if}}

@Entity()
{{#if sql}}
export class TestEntity implements IdEntity<TestEntity> {
  @PrimaryKey()
  id: string = v4();
{{/if}}
{{#if mongo}}
export class TestEntity implements MongoEntity<TestEntity> {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;
{{/if}}

  @Property()
  aKey!: string;

  @Property()
  aValue!: string;

  constructor(aKey: string, aValue: string) {
    this.aKey = aKey;
    this.aValue = aValue;
  }
}

/**
 * Base MikroORM entity for most other entities
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */
{{#if sql}}
import { v4 } from 'uuid';
import { PrimaryKey, Property } from '@mikro-orm/core';
{{/if}}
{{#if mongo}}
import { PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/core';
import { ObjectId } from 'mongodb';
{{/if}}

export abstract class BaseEntity {
  @PrimaryKey()
{{#if sql}}
  id: string = v4();
{{/if}}
{{#if mongo}}
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;
{{/if}}

  @Property({ nullable: true, onCreate: () => new Date() })
  createdAt!: Date;

  @Property({
    nullable: true,
    onCreate: () => new Date(),
    onUpdate: () => new Date()
  })
  updatedAt!: Date;
}

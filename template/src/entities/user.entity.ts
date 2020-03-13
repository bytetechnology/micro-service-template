/**
 * Sample user entity for Mikro-ORM
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */

import { Entity, IdEntity, PrimaryKey, Property } from 'mikro-orm';

@Entity()
export class User implements IdEntity<User> {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  passwordHash!: string;

  constructor(name: string, passwordHash: string) {
    this.name = name;
    this.passwordHash = passwordHash;
  }
}

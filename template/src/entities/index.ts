/**
 * Exports all the Mikro-ORM entities
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */

import { BaseEntity } from './base.entity';
import { TestEntity } from './test.entity';

export { TestEntity };

export const entities = [BaseEntity, TestEntity];

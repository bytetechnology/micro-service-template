/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import * as jf from 'joiful';

export class ExampleEvent {
  @(jf.string().required())
  id!: string;
}

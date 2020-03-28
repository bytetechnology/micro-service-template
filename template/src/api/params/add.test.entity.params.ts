/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import * as jf from 'joiful';

export class AddTestEntityParams {
  @(jf.string().required())
  aKey!: string;

  @(jf.string().required())
  aValue!: string;
}

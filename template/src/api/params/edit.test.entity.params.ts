/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import * as jf from 'joiful';

export class EditTestEntityParams {
  @(jf.string().required())
  id!: string;

  @(jf.string().required())
  aKey!: string;

  @(jf.string().required())
  aValue!: string;
}

/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import * as jf from 'joiful';

export class WelcomeParams {
  @(jf.string().required())
  name!: string;
}

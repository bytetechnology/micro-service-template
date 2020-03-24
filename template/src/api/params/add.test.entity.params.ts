import * as jf from 'joiful';

export class AddTestEntityParams {
  @(jf.string().required())
  aKey!: string;

  @(jf.string().required())
  aValue!: string;
}

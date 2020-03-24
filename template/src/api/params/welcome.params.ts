import * as jf from 'joiful';

export class WelcomeParams {
  @(jf.string().required())
  name!: string;
}

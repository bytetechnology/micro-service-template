import * as jf from 'joiful';

export class ExampleEvent {
  @(jf.string().required())
  id!: string;
}

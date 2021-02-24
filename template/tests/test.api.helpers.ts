import { Auth } from '@bytetech/authz-api';
import { 
  WelcomeParams, 
  WelcomeResponse,
{{#if needDb}}
  AddTestEntityParams, 
  AddTestEntityResponse, 
  EditTestEntityParams,
  EditTestEntityResponse 
{{/if}}
} from '../src/api';
import { managerAuth } from './test.utils';
import { broker } from '../src/lib/moleculer/broker';

export async function pingAuth(
  auth: Auth = managerAuth
): Promise<string> {
  return broker.call('{{serviceName}}.pingAuth', undefined, { meta: { auth } });
}

export async function welcome(
  data: WelcomeParams,
  auth: Auth = managerAuth
): Promise<WelcomeResponse> {
  return broker.call('{{serviceName}}.welcome', data, { meta: { auth } });
}
{{#if needDb}}

export async function addTestEntity(
  data: AddTestEntityParams,
  auth: Auth = managerAuth
): Promise<AddTestEntityResponse> {
  return broker.call('{{serviceName}}.addTestEntity', data, { meta: { auth } });
}

export async function editTestEntity(
  data: EditTestEntityParams,
  auth: Auth = managerAuth
): Promise<EditTestEntityResponse> {
  return broker.call('{{serviceName}}.editTestEntity', data, { meta: { auth } });
}

{{/if}}
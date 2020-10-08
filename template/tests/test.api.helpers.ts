import { Auth } from '@bytetech/micro-authz';
import { 
  WelcomeParams, 
  WelcomeResponse, 
  AddTestEntityParams, 
  AddTestEntityResponse, 
  EditTestEntityParams,
  EditTestEntityResponse 
} from '../src/api';
import { broker } from '../src/lib/moleculer/broker';

const managerAuth: Auth = {
  primaryClientId: 'TEST-CLIENT-ID',
  currentClientId: 'TEST-CLIENT-ID',
  userId: 'TEST-USER-ID',
  permissions: {
    rules: [{ action: 'manage', subject: 'all' }]
  }
};

export async function pingAuth(
  data: string,
  auth: Auth = managerAuth
): Promise<string> {
  return broker.call('{{serviceName}}.pingAuth', data, { meta: { auth } });
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
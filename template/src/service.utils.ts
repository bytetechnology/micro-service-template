import * as AuthzApi from '@bytetech/authz-api';
import { PureAbility } from '@casl/ability';

import { AppSubjects, AppActions } from './api';
import { commonAuthorize } from './lib/common.utils';

type ApiAbility = PureAbility<[AppActions, AppSubjects]>;

export function authorize(ctx: { meta: { auth: AuthzApi.Auth } }) {
  return commonAuthorize<ApiAbility>(ctx);
}

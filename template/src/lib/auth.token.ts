/**
 * Creates and validates an authentication json web token
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */

import jwt from 'jsonwebtoken';
import _ from 'lodash';
import * as jf from 'joiful';
import { Errors } from 'moleculer';
import { Ability } from '@casl/ability';

import { AppActions, AppSubjects } from '../api/index';
import { config } from './env';

export type AppRules = [AppActions, AppSubjects];
export type AppAbility = Ability<AppRules>;

export class CaslAbility {
  @(jf
    .array()
    .items(joi => joi.string())
    .single()
    .required())
  action!: AppActions | AppActions[];

  @(jf
    .array()
    .items(joi => joi.string())
    .single()
    .required())
  subject!: AppSubjects | AppSubjects[];

  @(jf
    .array()
    .items(joi => joi.string())
    .single()
    .optional())
  fields?: string | string[];

  @(jf.any().optional())
  conditions?: any;

  @(jf.boolean().optional())
  inverted?: boolean;

  @(jf.string().optional())
  reason?: string;
}

export class AuthTokenPayload {
  @(jf.string().required())
  userId: string = '';

  @(jf.string().required())
  clientId: string = '';

  @(jf.array({ elementClass: CaslAbility }).required())
  abilities: CaslAbility[] = [];
}

type verifiedPayload = AuthTokenPayload & {
  exp: number;
  iat: number;
};

export const createAuthToken = (payload: AuthTokenPayload): string => {
  return jwt.sign(payload, config.AUTH__JWT_KEY, { expiresIn: 300 });
};

export const verifyAuthToken = (token: string): AuthTokenPayload => {
  let vPayload;

  try {
    vPayload = jwt.verify(token, config.AUTH__JWT_KEY) as verifiedPayload;
  } catch (err) {
    throw new Errors.MoleculerError(`JWT verification error: ${err}`, 401);
  }

  const payload = _.pick(
    vPayload,
    Object.keys(new AuthTokenPayload())
  ) as AuthTokenPayload;

  const { error: validationErr, value } = jf.validateAsClass(
    payload,
    AuthTokenPayload,
    {
      allowUnknown: false
    }
  );

  if (validationErr) {
    throw new Errors.MoleculerError(
      `JWT validation error: ${validationErr}`,
      401
    );
  }

  return value;
};

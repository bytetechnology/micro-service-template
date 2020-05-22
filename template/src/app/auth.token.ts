/**
 * Creates and validates an authentication json web token
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */

import jwt from 'jsonwebtoken';
import _ from 'lodash';
import * as jf from 'joiful';
import { Errors } from 'moleculer';

import { AuthTokenPayload } from '../service.types';
import { config } from '../lib/env';

const key: jwt.Secret = config.AUTH__JWT_KEY;

type verifiedPayload = AuthTokenPayload & {
  exp: number;
  iat: number;
};

export const createAuthToken = (payload: AuthTokenPayload): string => {
  return jwt.sign(payload, key, { expiresIn: 300 });
};

export const verifyAuthToken = (token: string): AuthTokenPayload => {
  const vPayload = jwt.verify(token, key) as verifiedPayload;

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

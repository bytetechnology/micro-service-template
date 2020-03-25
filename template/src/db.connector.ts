/**
 * Important:
 *  - do not rename this file
 *  - do not modify interface of this file
 *
 * This file is used by src/lib and it's purpose is to provide initialized mikro-orm database connector
 *
 * Copyright Byte Technology 2019. All rights reserved.
 */

import { MikroConnector } from 'moleculer-context-db';
import { entities } from './entities';
import { config } from './lib';

export const dbConnector: MikroConnector = new MikroConnector();

export async function initAndGetDbConnector() {
  await dbConnector.init({
    type: config.DB_CORE__TYPE,
    dbName: config.DB_CORE__DB_NAME,
    name: config.DB_CORE__NAME,
    clientUrl: config.DB_CORE__CLIENT_URL,
    user: config.DB_CORE__USER,
    password: config.DB_CORE__PASSWORD,
    entities,
    cache: {
      enabled: false
    }
  });
}

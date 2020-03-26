/**
 * Important:
 *  - do not rename this file
 *  - do not modify interface of this file
 *
 * This file is used by src/lib and it's purpose is to provide initialized mikro-orm database connector
 *
 * Copyright Byte Technology 2019. All rights reserved.
 */

import { DatabaseContextManager } from 'moleculer-context-db';
import Moleculer from 'moleculer';
import { getDbConnector } from '../db.connector';

let dbMiddleware: Moleculer.Middleware;

// TODO async singletone

export async function getDbMiddleware(): Promise<Moleculer.Middleware> {
  if (dbMiddleware) {
    return dbMiddleware;
  }

  const dbConnector = await getDbConnector();

  const dbContextManager: DatabaseContextManager = new DatabaseContextManager(
    dbConnector
  );

  dbMiddleware = dbContextManager.middleware();

  return dbMiddleware;
}

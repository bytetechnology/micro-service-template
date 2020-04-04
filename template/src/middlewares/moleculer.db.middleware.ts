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
import thunkyp from 'thunky/promise';
import * as dbConnectorModule from '../db.connector';

export const getDbMiddleware = thunkyp(async function getDbMiddleware() {
  const dbConnector = await dbConnectorModule.getDbConnector();
  {{#if sql}}
  const generator = dbConnector.getORM().getSchemaGenerator();
  await generator.updateSchema();
  {{/if}}
  {{#if mongo}}
  await dbConnector.getORM().em.getDriver().createCollections();
  {{/if}}

  const dbContextManager: DatabaseContextManager = new DatabaseContextManager(
    dbConnector
  );

  const dbMiddleware = dbContextManager.middleware();

  return dbMiddleware;
});

/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { getDbConnector } from '../src/db.connector';

export async function resetServiceDB(): Promise<void> {
  const dbConnector = await getDbConnector();

  await dbConnector
    .getORM()
    .getSchemaGenerator()
    .updateSchema();
}

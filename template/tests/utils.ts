import { getDbConnector } from '../src/db.connector';

export async function resetServiceDB(): Promise<void> {
  const dbConnector = await getDbConnector();

  await dbConnector
    .getORM()
    .getSchemaGenerator()
    .updateSchema();
}

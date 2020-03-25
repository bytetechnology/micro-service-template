import { dbConnector } from '../src/db.connector';

export async function resetServiceDB(): Promise<void> {
  await dbConnector
    .getORM()
    .getSchemaGenerator()
    .updateSchema();
}

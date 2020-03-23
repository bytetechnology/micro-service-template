import { dbConnector } from '../src/lib/service.broker';

export async function resetServiceDB(): Promise<void> {
  await dbConnector
    .getORM()
    .getSchemaGenerator()
    .updateSchema();
}

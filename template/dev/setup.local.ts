// eslint-disable-next-line import/no-extraneous-dependencies
import globby from 'globby';
import pkgDir from 'pkg-dir';
import fs from 'fs';
import path from 'path';

let { log } = console;

const prefixExampleSuffixRX = /^(?<prefix>.*\/)example(?<suffix>[^/]+\.env)$/;
function exampleToLocalPath(examplePath: string): string {
  const localPath = examplePath.replace(prefixExampleSuffixRX, '$1local$2');

  if (localPath === examplePath) {
    throw new Error(
      `Unable to convert example path into local path. Example path="${examplePath}".`
    );
  }

  return localPath;
}

async function getAppRoot(): Promise<string> {
  let root = (await pkgDir(__dirname)) as string;
  if (!root) {
    throw new Error(`Unable to determine project root directory.`);
  }
  root = root.replace(/\\/g, '/');

  return root;
}

function unhandledError(err: any) {
  console.error(`Unhandled error:`); // eslint-disable-line no-console
  console.error(err); // eslint-disable-line no-console
  setTimeout(() => {
    process.exit(1);
  }, 1000);
}

process.on('uncaughtException', unhandledError);
process.on('unhandledRejection', unhandledError);

// ===========================================================

async function initLocalConfigs(projectRoot: string) {
  const exampleConfigs = await globby([`${projectRoot}/envs/example.*.env`]);
  const localConfigs = await globby([`${projectRoot}/envs/local.*.env`]);
  const configsToCreate = exampleConfigs.filter(exampleCfg => {
    const localCfg = exampleToLocalPath(exampleCfg);
    const alreadyExists = localConfigs.includes(localCfg);
    if (alreadyExists) {
      log(
        `  - SKIP  Create ${localCfg.replace(
          `${projectRoot}/`,
          ''
        )}.  Already exists.`
      );
    }
    return !alreadyExists;
  });

  configsToCreate.forEach(exampleCfg => {
    const localCfg = exampleToLocalPath(exampleCfg);
    fs.copyFileSync(exampleCfg, localCfg);

    log(
      `  - CREATE  ${localCfg.replace(
        `${projectRoot}/`,
        ''
      )}  basing on  ${exampleCfg.replace(`${projectRoot}/`, '')}`
    );
  });
}

// ===========================================================

async function run() {
  const root = await getAppRoot();
  const projectName = path.basename(root);
  // eslint-disable-next-line no-console
  log = (...args: any[]) => console.log(`[${projectName}] `, ...args);

  log(`Local dev env setup START...`);

  await initLocalConfigs(root);

  log(`Local dev env COMPLETE.`);
}

run();

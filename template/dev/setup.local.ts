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

function isInstalledAsDependency(moduleRootPath: string): boolean {
  return path.basename(path.dirname(moduleRootPath)) === 'node_modules';
}

function fileExistsSync(file: string): boolean {
  try {
    fs.accessSync(file);
    return true;
  } catch (err) {
    return false;
  }
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

async function initGitHooks(projectRoot: string) {
  const prePushFile = `${projectRoot}/.git/hooks/pre-push`;

  if (fileExistsSync(prePushFile)) {
    log(`  - SKIP  Create local pre-push git hook.  Already created.`);
    return;
  }

  const prePushScript =
    `#!/bin/sh\n` +
    `if [ $(git status --porcelain | wc -l) -eq "0" ]; then\n` +
    `  echo "Git repo is clean."\n` +
    `  npm run lint && npm run format && npm run build && git add . && git commit -m "AUTO LINT FIX" || echo "pre-push done"\n` +
    `else\n` +
    `  echo "[Git pre-push hook] Repository is not clean."\n` +
    `exit 1\n` +
    `fi\n` +
    ``;
  fs.mkdirSync(path.dirname(prePushFile), { recursive: true });
  fs.writeFileSync(prePushFile, prePushScript, { mode: 0o777 });
  log(`  - CREATE  Git pre-push hook  ${prePushFile}`);
}

// ===========================================================

async function run() {
  const root = await getAppRoot();
  const projectName = path.basename(root);
  // eslint-disable-next-line no-console
  log = (...args: any[]) => console.log(`[${projectName}] `, ...args);

  log(`Local dev env setup START...`);

  if (isInstalledAsDependency(root)) {
    log(`Local setup SKIP. This module is installed as dependency.`);
    return;
  }

  await initLocalConfigs(root);
  await initGitHooks(root);

  log(`Local dev env COMPLETE.`);
}

run();

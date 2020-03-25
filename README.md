# micro-service-template

moleculer template for byte microservices

## What is this?

This is a moleculer template for Byte Technology micro-services. This will provide a functional service along with required packages and tooling to build a micro-service for the Byte Technology cloud backend.

## Prerequisites

- Install Node.js (preferred version 12 or higher) and npm.
- Setup [micro-dev-environment](https://github.com/bytetechnology/micro-dev-environment) (BYTE_SW_MICRO_REPO_PATH should be set)
- Install moleculer comman line interface `npm install -g moleculer-cli`

## Create new service:

1. Create new service code via moleculer-cli. Below command will create service basing on `master` branch of [micro-service-template](https://github.com/bytetechnology/micro-service-template) repo in BYTE_SW_MICRO_REPO_PATH:
  ```sh
  moleculer init --no-install "bytetechnology/micro-service-template" micro-<SERVICE_NAME>
  ```
  You can specify branch using `#`:
  ```sh
  moleculer init --no-install "bytetechnology/micro-service-template#my/branch" micro-<SERVICE_NAME>
  ```

2. Add your new service to git repo `https://github.com/bytetechnology/micro-<SERVICE_NAME>`

3. From add new service from BYTE_SW_MICRO_REPO_PATH/micro-dev-environment
  ```sh
  sh add-new-service.sh <SERVICE_NAME>
  ```

At point 3. you created new file `micro-dev-environment/docker-compose.<SERVICE_NAME>.yml` - it is definition of container that serves you to run service in dev env.

## Development of new service

You have 2 options for development:
1. Run service on host OS - can be faster but you will be only able to run tests (no dev mode runtime)
2. Run service in container.

! Imporant:
- If you made `npm install` from host OS and you want to work inside container then remove node_modules direcory and install it again from inside container. The same for opposite scenario.

### 1. Run service on host OS:

  Prerequisites:

  Windows:
    - `npm i -w windows-build-tools` via admin powershell

  Linux:
    - `apk add --no-cache make gcc g++ python git`

  - `npm install` from `micro-<SERVICE_NAME>` dir. If failed try multiple times.
  - `npm test` to run tests

### 2. Run inside container:

  Prerequisites:

    After you've created new `.yml` file via `sh add-new-service.sh <SERIVCE_NAME>` you should have running container for your new service. From BYTE_SW_MICRO_REPO_PATH/micro-dev-environment call:
    - `sh up.sh`

  - go into container. From  `micro-<SERVICE_NAME>` dir call:
  - `sh enter-conatiner`
  - `npm install`
  - `npm test` to run tests
  - `npm run dev` to run service in development environment with interactive [moleculer-cli](https://moleculer.services/docs/0.14/moleculer-cli.html).


## Rules

- Services need to be written in TypeScript.
- 100% unit test coverage is expected.
- Run `npm run lint` and fix any issues before checking in.
- Format your code ``npm run format`. There should be _NO_ comments in code reviews about format issues.

## Production deployment

There is a Dockerfile that will generate a production ready docker image:

`docker build -t "bytetechnology/<service>:latest" .`

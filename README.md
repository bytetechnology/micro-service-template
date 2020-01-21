# micro-service-template
moleculer template for byte microservices

## What is this?
This is a moleculer template for Byte Technology micro-services. This will provide a functional service along with required packages and tooling to build a micro-service for the Byte Technology cloud backend.

## Usage
```moleculer init "bytetechnology/micro-service-template" micro-sample```

## Requirements
- ```BYTE_SW_MICRO_REPO_PATH``` environment variable defined and pointing to where your repositories are located. Please see [micro-dev-environment](https://github.com/bytetechnology/micro-dev-environment) for more details.
- Core services as defined in the [micro-dev-environment](https://github.com/bytetechnology/micro-dev-environment) should be up and running.
  - ```docker-compose up -d -p byte-dev```
- GELF TCP input configured on the Graylog log server
  - Log into the [Graylog](http://localhost:9000) server; user name: ```admin```; password: ```somepasswordpepper```
  - Create a GELF TCP input to run on the default port 12201.
- Create a ```docker-compose.<service>.yml``` file for your service under ```micro-dev-environment``` directory.
  Example: 
```yml
version: "3"

services:
  api: # api service
    image: "bytetechnology/alpine-node-12:dev"
    ports:
      - "3000" # if the service needs to expose ports, list them here
    networks:
      - transaction # connect to byte network
      - log # connect to the logging network
    volumes: # map git repo from host
      - ${BYTE_SW_MICRO_REPO_PATH:?Missing value for BYTE_SW_MICRO_REPO_PATH env variable}/micro-api:/home/bytedev/micro-api:cached
    command: tail -f /dev/null # make sure container does not quit on startup since initial command is just bash
    depends_on: # start after message-broker and logging services
      - message-broker
      - logger
```
- Launch a container with the ```docker-compose.<service>.yml``` file and attach it to the rest of the docker dev environment running the core services
  - ```./byte-service up -d <service>```

## Create your service
- Enter the container that you created above:
  - ```docker exec -it <container_name> bash```
- Create the service using this template:
```bash
moleculer init "bytetechnology/micro-service-template" micro-<service>
cd micro-<service>
```

## Running the service
```bash
npm run lint
npm run format
npm run test
npm run dev
```

## Rules
- Services need to be written in TypeScript.
- 100% unit test coverage is expected.
- Run ```npm run lint``` and fix any issues before checking in.
- Format your code ```npm run format``. There should be *NO* comments in code reviews about format issues.

## Production deployment
There is a Dockerfile that will generate a production ready docker image:

```docker build -t "bytetechnology/<service>:latest" .```

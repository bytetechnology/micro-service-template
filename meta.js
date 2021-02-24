"use strict";

TODO
- add crateCall and other helpers
- add typings to all @casl abilities and builders

var fs = require("fs");
var path = require("path");

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.substring(1);
}

module.exports = function (values) {
  return {
    questions: [{
        type: "confirm",
        name: "needDb",
        message: "Does your service need to access a database",
        default: true
      },
      {
        type: "list",
        name: "db",
        message: "Select a db",
        choices: [{
            name: "sql",
            value: "sql"
          },
          {
            name: "mongo",
            value: "mongo"
          }
        ],
        when(answers) {
          return answers.needDb;
        },
        default: "sql"
      },
      {
        type: "confirm",
        name: "mongoTransactions",
        message: "Does your mongo instance support transactions?",
        default: false,
        when(answers) {
          return answers.db === "mongo";
        }
      }
    ],
    metalsmith: {
      before(metalsmith) {
        // set the servce name which would the string after "micro-", e.g. if projectName is "micro-discount",
        // then serviceName is "discount"
        // if projectName does not start with "micro-", then serviceName = projectName
        const projectName = metalsmith._metadata.projectName;
        let serviceName, capitalizedCamelCaseServiceName;
        let prefixExists = metalsmith._metadata.projectName.startsWith(
          "micro-"
        );
        serviceName = prefixExists ? projectName.slice(6) : projectName;
        capitalizedCamelCaseServiceName =
          serviceName
            .split(/[_-]/)
            .map(capitalize)
            .join('');
        metalsmith._metadata.serviceName = serviceName;
        metalsmith._metadata.capitalizedCamelCaseServiceName = capitalizedCamelCaseServiceName;
        // if we are using a database, set the appropriate database flag to true since handlebars can't compare values without helpers
        if (metalsmith._metadata.needDb) {
          const dbType = metalsmith._metadata.db;
          metalsmith._metadata[dbType] = true;
        }
      },

      complete(metalsmith) {
        // rename some files
        const projectPath = metalsmith._metadata.projectPath;
        const serviceName = metalsmith._metadata.serviceName;

        let oldFileName = `${projectPath}${path.sep}src${path.sep}SERVICE_NAME.service.ts`;
        let newFileName = `${projectPath}${path.sep}src${path.sep}${serviceName}.service.ts`;
        fs.renameSync(oldFileName, newFileName);

        oldFileName = `${projectPath}${path.sep}tests${path.sep}SERVICE_NAME.service.spec.ts`;
        newFileName = `${projectPath}${path.sep}tests${path.sep}${serviceName}.service.spec.ts`;
        fs.renameSync(oldFileName, newFileName);

        oldFileName = `${projectPath}${path.sep}envs${path.sep}example.dev.env`;
        newFileName = `${projectPath}${path.sep}envs${path.sep}local.dev.env`;
        fs.renameSync(oldFileName, newFileName);

        oldFileName = `${projectPath}${path.sep}envs${path.sep}example.test.env`;
        newFileName = `${projectPath}${path.sep}envs${path.sep}local.test.env`;
        fs.renameSync(oldFileName, newFileName);

        // if we don't need any database, delete any database specific stuff
        if (!metalsmith._metadata.needDb) {
          const entitiesDir = `${projectPath}${path.sep}src${path.sep}entities`;
          fs.rmdirSync(entitiesDir, {
            recursive: true
          });

          const addTestEntityParamsFile = `${projectPath}${path.sep}src${path.sep}api${path.sep}params${path.sep}add.test.entity.params.ts`;
          fs.unlinkSync(addTestEntityParamsFile);
          const editTestEntityParamsFile = `${projectPath}${path.sep}src${path.sep}api${path.sep}params${path.sep}edit.test.entity.params.ts`;
          fs.unlinkSync(editTestEntityParamsFile);
          const addTestEntityActionFile = `${projectPath}${path.sep}src${path.sep}action.handlers${path.sep}add.test.entity.ts`;
          fs.unlinkSync(addTestEntityActionFile);
          const editTestEntityActionFile = `${projectPath}${path.sep}src${path.sep}action.handlers${path.sep}edit.test.entity.ts`;
          fs.unlinkSync(editTestEntityActionFile);
          const dbConnectorFile = `${projectPath}${path.sep}src${path.sep}db.connector.ts`;
          fs.unlinkSync(dbConnectorFile);
          const dbConnectorSpecFile = `${projectPath}${path.sep}tests${path.sep}db.connector.spec.ts`;
          fs.unlinkSync(dbConnectorSpecFile);
          const utilsFile = `${projectPath}${path.sep}tests${path.sep}utils.ts`;
          fs.unlinkSync(utilsFile);
          const middleWareDbFile = `${projectPath}${path.sep}src${path.sep}middlewares${path.sep}moleculer.db.middleware.ts`;
          fs.unlinkSync(middleWareDbFile);
          const middleWareDbSpecFile = `${projectPath}${path.sep}tests${path.sep}middlewares${path.sep}moleculer.db.middleware.spec.ts`;
          fs.unlinkSync(middleWareDbSpecFile);
          const namingStrategyFile = `${projectPath}${path.sep}src${path.sep}mikro.orm.naming.strategy.ts`;
          fs.unlinkSync(namingStrategyFile);
          const namingStrategySpecFile = `${projectPath}${path.sep}tests${path.sep}mikro.orm.naming.strategy.spec.ts`;
          fs.unlinkSync(namingStrategySpecFile);

          return;
        }
      }
    },

    completeMessage: `
To get started:

  cd {{projectName}}
  npm run check

		`
  };
};
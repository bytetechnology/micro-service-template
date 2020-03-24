"use strict";

var fs = require("fs");
var path = require("path");

module.exports = function (values) {
  return {
    metalsmith: {
      before(metalsmith) {
        // set the servce name which would the string after "micro-", e.g. if projectName is "micro-discount",
        // then serviceName is "discount"
        // if projectName does not start with "micro-", then serviceName = projectName
        const projectName = metalsmith._metadata.projectName;
        let serviceName, capitalizedServiceName;
        let prefixExists = metalsmith._metadata.projectName.startsWith(
          "micro-"
        );
        serviceName = prefixExists ? projectName.slice(6) : projectName;
        capitalizedServiceName =
          serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
        metalsmith._metadata.serviceName = serviceName;
        metalsmith._metadata.capitalizedServiceName = capitalizedServiceName;
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
      }
    },

    completeMessage: `
To get started:

  cd {{projectName}}
  npm run format
  npm run lint
  npm run test
  npm run dev

		`
  };
};
"use strict";

module.exports = function (values) {
  return {
    questions: [{
        type: "confirm",
        name: "needTransporter",
        message: "Would you like to communicate with other nodes?",
        default: true
      },
      {
        type: "list",
        name: "transporter",
        message: "Select a transporter",
        choices: [{
            name: "NATS",
            value: "NATS"
          },
          {
            name: "Redis",
            value: "Redis"
          },
          {
            name: "MQTT",
            value: "MQTT"
          },
          {
            name: "AMQP (recommended)",
            value: "AMQP"
          },
          {
            name: "TCP (experimental)",
            value: "TCP"
          },
          {
            name: "NATS Streaming (experimental)",
            value: "STAN"
          },
          {
            name: "Kafka (experimental)",
            value: "Kafka"
          }
        ],
        when(answers) {
          return answers.needTransporter;
        },
        default: "AMQP"
      },
      {
        type: "confirm",
        name: "needCacher",
        message: "Would you like to use cache?",
        default: false
      },
      {
        type: "list",
        name: "cacher",
        message: "Select a cacher solution",
        choices: [{
          name: "Memory",
          value: "Memory"
        }, {
          name: "Redis",
          value: "Redis"
        }],
        when(answers) {
          return answers.needCacher;
        },
        default: "Memory"
      },
      {
        type: "confirm",
        name: "docker",
        message: "Add Docker files?",
        default: true
      },
      {
        type: "confirm",
        name: "lint",
        message: "Use ESLint to lint your code?",
        default: true
      },
      {
        type: "confirm",
        name: "jest",
        message: "Setup unit tests with Jest?",
        default: true
      }
    ],

    //skipInterpolation: [],

    filters: {
      "services/api.service.ts": "apiGW",
      ".eslintrc.js": "lint",
      "test/**/*": "jest",

      ".dockerignore": "docker",
      Dockerfile: "docker"
    },

    completeMessage: `
To get started:
	cd {{projectName}}
	npm run dev
		`
  };
};
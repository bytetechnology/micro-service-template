import { BrokerOptions } from 'moleculer';
import WinstonGelfTransporter from 'winston-gelf-transporter';

/**
 * Moleculer ServiceBroker configuration file
 *
 * More info about options: https://moleculer.services/docs/0.14/broker.html#Broker-options
 *
 * Overwrite options in production:
 * ================================
 * 	You can overwrite any option with environment variables.
 * 	For example to overwrite the "logLevel", use `LOGLEVEL=warn` env var.
 * 	To overwrite a nested parameter, e.g. retryPolicy.retries, use `RETRYPOLICY_RETRIES=10` env var.
 *
 * 	To overwrite broker’s deeply nested default options, which are not presented in "moleculer.config.ts",
 * 	via environment variables, use the `MOL_` prefix and double underscore `__` for nested properties in .env file.
 * 	For example, to set the cacher prefix to `MYCACHE`,
 *  you should declare an env var as `MOL_CACHER__OPTIONS__PREFIX=MYCACHE`.
 */
export const defaultBrokerConfig: BrokerOptions = {
  // Namespace of nodes to segment your nodes on the same network.
  namespace: '',
  // Unique node identifier. Must be unique in a namespace.
  nodeID: `{{serviceName}}-${process.env.HOSTNAME}`,

  // Log formatter for built-in console logger. Available values: default, simple, short. It can be also a `Function`.
  logFormatter: 'default',
  // Log level for built-in console logger. Available values: trace, debug, info, warn, error, fatal
  logLevel: 'info',
  // Custom object & array printer for built-in console logger.
  logObjectPrinter: undefined,
  // Enable/disable logging or use custom logger. More info: https://moleculer.services/docs/0.14/logging.html
  logger: [
    {
      type: 'Console',
      options: {
        level: process.env.LOG_LEVEL,
        colors: true,
        moduleColors: false,
        formatter: 'full',
        objectPrinter: null,
        autoPadding: false
      }
    },
    {
      type: 'Winston',
      options: {
        level: process.env.LOG_LEVEL,
        winston: {
          transports: [
            new WinstonGelfTransporter({
              host: process.env.LOG_HOST || 'graylog',
              port: parseInt(process.env.LOG_PORT || '12201', 10),
              protocol: 'tcp'
            })
          ]
        }
      }
    }
  ],

  // Define transporter.
  // More info: https://moleculer.services/docs/0.14/networking.html
  transporter: {
    options: {
      url: `amqp://${process.env.RABBITMQ_HOST || 'rabbitmq'}:${process.env
        .RABBITMQ_PORT || 5672}`
    },
    type: 'AMQP'
  },

  // Define a serializer.
  // Available values: "JSON", "Avro", "ProtoBuf", "MsgPack", "Notepack", "Thrift".
  // More info: https://moleculer.services/docs/0.14/networking.html
  serializer: 'JSON',

  // Number of milliseconds to wait before reject a request with a RequestTimeout error. Disabled: 0
  requestTimeout: 10 * 1000,

  // Retry policy settings. More info: https://moleculer.services/docs/0.14/fault-tolerance.html#Retry
  retryPolicy: {
    // A function to check failed requests.
    check: (err: Error) => err && err.message.length > 0,
    // First delay in milliseconds.
    delay: 100,
    // Enable feature
    enabled: false,
    // Backoff factor for delay. 2 means exponential backoff.
    factor: 2,
    // Maximum delay in milliseconds.
    maxDelay: 1000,
    // Count of retries
    retries: 5
  },

  // Limit of calling level. If it reaches the limit, broker will throw an MaxCallLevelError error.
  // (Infinite loop protection)
  maxCallLevel: 100,

  // Number of seconds to send heartbeat packet to other nodes.
  heartbeatInterval: 5,
  // Number of seconds to wait before setting node to unavailable status.
  heartbeatTimeout: 15,

  // Tracking requests and waiting for running requests before shutdowning.
  // More info: https://moleculer.services/docs/0.14/fault-tolerance.html
  tracking: {
    // Enable feature
    enabled: false,
    // Number of milliseconds to wait before shutdowning the process
    shutdownTimeout: 5000
  },

  // Disable built-in request & emit balancer. (Transporter must support it, as well.)
  disableBalancer: true,

  // Settings of Service Registry. More info: https://moleculer.services/docs/0.14/registry.html
  registry: {
    // Enable local action call preferring.
    preferLocal: true,
    // Define balancing strategy.
    // Available values: "RoundRobin", "Random", "CpuUsage", "Latency"
    strategy: 'RoundRobin'
  },

  // Settings of Circuit Breaker. More info: https://moleculer.services/docs/0.14/fault-tolerance.html#Circuit-Breaker
  circuitBreaker: {
    // A function to check failed requests.
    check: (err: Error) => err && err.message.length > 0,
    // Enable feature
    enabled: false,
    // Number of milliseconds to switch from open to half-open state
    halfOpenTime: 10 * 1000,
    // Minimum request count. Below it, CB does not trip.
    minRequestCount: 20,
    // Threshold value. 0.5 means that 50% should be failed for tripping.
    threshold: 0.5,
    // Number of seconds for time window.
    windowTime: 60
  },

  // Settings of bulkhead feature. More info: https://moleculer.services/docs/0.14/fault-tolerance.html#Bulkhead
  bulkhead: {
    // Maximum concurrent executions.
    concurrency: 10,
    // Enable feature.
    enabled: false,
    // Maximum size of queue
    maxQueueSize: 100
  },

  validator: true,

  // Enable metrics function. More info: https://moleculer.services/docs/0.14/metrics.html
  metrics: true,

  // Register internal middlewares. More info: https://moleculer.services/docs/0.14/middlewares.html#Internal-middlewares
  internalMiddlewares: true,
  // Register internal services ("$node").
  // More info: https://moleculer.services/docs/0.14/services.html#Internal-services
  internalServices: true,

  // Watch the loaded services and hot reload if they changed.
  // You can also enable it in Moleculer Runner with `--hot` argument
  hotReload: false,

  // Register custom middlewares
  middlewares: [],

  // Register custom REPL commands.
  replCommands: undefined
};
import { BrokerOptions } from "moleculer";
import { defaultBrokerConfig } from "./defaut.broker.config";

let brokerConfig: BrokerOptions = {};
if (process.env.NODE_ENV !== 'test') { // TODO use env module
    brokerConfig = defaultBrokerConfig;
}

// override defaults
brokerConfig.logLevel = process.env.LOG_LEVEL as any || brokerConfig.logLevel; // TODO use env module

export { brokerConfig };

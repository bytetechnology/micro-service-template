import { config } from '../src/lib';

// Override default set in  package.json => jest.testTimeout
if (config.JEST_TIMEOUT !== undefined) {
  jest.setTimeout(+config.JEST_TIMEOUT);
}
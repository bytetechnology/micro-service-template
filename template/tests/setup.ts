/**
 * Copyright Byte Technology 2020. All rights reserved.
 */
import { config } from '../src/lib/env';

// Override default set in  package.json => jest.testTimeout
if (config.JEST_TIMEOUT !== undefined) {
  jest.setTimeout(+config.JEST_TIMEOUT);
}

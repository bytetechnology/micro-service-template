/**
 * ! Do not rename or move file.
 * ! Do not rename Env class.
 *
 * Environment variables will be validated basing on this file.
 * Example in EnvBase class.
 *
 * Env is type for { config } from ./lib
 */

// ! Important - do not impoprt from './lib' - EnvBase will be undefined in tests
import { EnvBase } from './lib/env.base.schema';

// Decorate properties using joiful validator
export class Env extends EnvBase {}

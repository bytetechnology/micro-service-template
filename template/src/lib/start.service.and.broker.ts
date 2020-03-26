/**
 * Service broker and start/init function.
 * Use it everywhere (production, dev, tests).
 * Adapt using proper config (env vars).
 *
 * Copyright Byte Technology 2020. All rights reserved.
 */
import Moleculer from 'moleculer';

import { EventEmitter } from 'events';
import { XxxService } from '../xxx.service';
import { broker } from './moleculer/broker';

let service: Moleculer.Service | null = null;

let pending: null | EventEmitter = null;

export async function getService(): Promise<Moleculer.Service> {
  if (service) {
    return service;
  }

  if (!pending) {
    throw new Error(
      `await getService() should be called after startServiceAndBroker().`
    );
  }
  return new Promise((resolve, reject) => {
    // `pending` is defined here. `?` is used only because of tsc compiler

    /* istanbul ignore next */
    // eslint-disable-next-line no-unused-expressions
    pending?.once('resolve', () => {
      /* istanbul ignore next */
      if (!service) {
        throw new Error(`Internal error - expected that service is set.`);
      }
      resolve(service);
    });

    /* istanbul ignore next */
    // eslint-disable-next-line no-unused-expressions
    pending?.once('error', reject);
  });
}

let started = false;

export async function startServiceAndBroker(
  middlewares: Array<string | Moleculer.Middleware | Moleculer.MiddlewareInit>
): Promise<void> {
  if (started) {
    throw new Error(`startServiceAndBroker() should be called only once.`);
  }
  started = true;

  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    /* istanbul ignore next */
    if (!pending) {
      pending = new EventEmitter();
    }

    pending.on('resolve', resolve);
    pending.on('error', reject);

    try {
      middlewares.forEach(mw => broker.middlewares.add(mw));
      const tmpService = broker.createService(XxxService);
      await broker.start();
      await broker.waitForServices('xxx');
      service = tmpService;
    } catch (err) {
      pending.emit('error', err);
      pending.removeAllListeners();
      pending = null;
      return;
    }

    pending.emit('resolve');
    pending.removeAllListeners();
    pending = null;
  });
}

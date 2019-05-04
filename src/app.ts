import * as express from 'express';

import { Upbit } from 'upbit-js';
import { RoutePublic } from './router/route-public';
import { RouteUpbit } from './router/route-upbit';

// Nuxt Framework
import * as consola from 'consola';
import { Builder, Nuxt } from 'nuxt';

// Import and Set Nuxt.js options
import * as config from '../nuxt.config.js';
config.dev = !(process.env.NODE_ENV === 'production');

const app = express();

const upbit = new Upbit();

async function start() {
  // Init Upbit
  console.log(upbit.getAccessToken());
  console.log(upbit.getSecretToken());

  RouteUpbit.set(app);
  RoutePublic.set(app);

  const PORT = process.env.PORT || 8080;

  // Init Nuxt.js
  const nuxt = new Nuxt(config);
  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
  });

  consola.default.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();

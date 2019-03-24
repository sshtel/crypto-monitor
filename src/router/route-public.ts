import * as express from 'express';

export class RoutePublic {
  public static set(app) {
    const staticPath = __dirname + '/../../src/public';
    app.use('/', express.static(staticPath));

  }

}

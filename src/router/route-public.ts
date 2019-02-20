export class RoutePublic {
  public static set(app) {

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

  }

}

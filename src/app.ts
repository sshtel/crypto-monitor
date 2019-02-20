import * as express from 'express';

// import * as jwt from 'jsonwebtoken';
// import * as request from 'superagent';
// import * as querystring from 'querystring';
import { Upbit } from 'upbit-js';
import { UpbitCron } from './cron/upbit-cron';
import { RoutePublic } from './router/route-public';
import { RouteUpbit } from './router/route-upbit';

const app = express();

const upbit = new Upbit();
const upbitCron = new UpbitCron();

let candlesMinutes = {};
upbitCron.on('candlesMinutes', value => {
  candlesMinutes = value;
});

let orderBook = {};
upbitCron.on('orderBook', value => {
  orderBook = value;
});

console.log(upbit.getAccessToken());
console.log(upbit.getSecretToken());
// const query = querystring.queryEncode({/* 요청할 파라미터 */});

RouteUpbit.set(app);
RoutePublic.set(app);

console.log(candlesMinutes);
console.log(orderBook);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

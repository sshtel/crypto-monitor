import * as express from 'express';

import * as jwt from 'jsonwebtoken';
import * as request from 'superagent';
// import * as querystring from 'querystring';
import { Upbit } from './upbit/upbit';

const app = express();

const upbit = new Upbit();

console.log(upbit.getAccessToken());
console.log(upbit.getSecretToken());
// const query = querystring.queryEncode({/* 요청할 파라미터 */});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/marketAll', async (req, res) => {
  const marketAll = await upbit.marketAll();
  res.send(marketAll);
});

app.get('/accounts', async (req, res) => {
  const payload = {access_key: upbit.getAccessToken(), nonce: (new Date).getTime()};
  const jwtToken = jwt.sign(payload, upbit.getSecretToken() as string);
  const authorizationToken = `Bearer ${jwtToken}`;

  request
  .get('https://api.upbit.com/v1/accounts')
  .set('Authorization', authorizationToken)
  .then(response => {
    res.send(response.body);
  });

});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

import * as _ from 'lodash';
import { constant } from '../constant';
import { BaseCurrency } from '../interface';
import { upbit, upbitProcessor } from '../processor/upbit-processor';

export class RouteUpbit {

  public static set(app) {

    app.get(`${constant.PATHNAME_EXCHANGE_UPBIT}/market-all/`, async (req, res) => {
      const marketAll = await upbit.marketAll();
      res.set({'Content-Type': 'application/json; charset=utf-8'})
      .status(200).send(JSON.stringify(marketAll, undefined, ' '));
    });

    app.get(`${constant.PATHNAME_EXCHANGE_UPBIT}/market-all/:baseCurrency`, async (req, res) => {
      const marketAll = await upbit.marketAll();
      const { baseCurrency } = req.params;

      Promise.all(
        marketAll.map( value => {
          if (value.market.indexOf(baseCurrency + '-') === 0) return value;
        })
      ).then( result => {
        const obj = _(result).omitBy(_.isNil).mapValues(v => v).value();
        res.set({'Content-Type': 'application/json; charset=utf-8'})
        .status(200).send(JSON.stringify(obj, undefined, ' '));
      });
    });

    app.get(`${constant.PATHNAME_EXCHANGE_UPBIT}/candles/minutes/:unit/:market`, async (req, res) => {
      const { unit, market } = req.params;
      const { count, to } = req.query;
      try {
        const result = await upbit.candlesMinutes({unit, market, count, to});
        res.set({'Content-Type': 'application/json; charset=utf-8'})
        .status(200).send(JSON.stringify(result, undefined, ' '));
      } catch (e) {
        this.respError500(res, e);
      }
    });

    app.get(`${constant.PATHNAME_EXCHANGE_UPBIT}/candles/days/:market`, async (req, res) => {
      const { market } = req.params;
      const { count, to } = req.query;
      try {
        const result = await upbit.candlesDays({market, count, to});
        res.set({'Content-Type': 'application/json; charset=utf-8'})
        .status(200).send(JSON.stringify(result, undefined, ' '));
      } catch (e) {
        this.respError500(res, e);
      }
    });

    app.get(`${constant.PATHNAME_EXCHANGE_UPBIT}/candles/weeks/:market`, async (req, res) => {
      const { market } = req.params;
      const { count, to } = req.query;
      try {
        const result = await upbit.candlesWeeks({market, count, to});
        res.set({'Content-Type': 'application/json; charset=utf-8'})
        .status(200).send(JSON.stringify(result, undefined, ' '));
      } catch (e) {
        this.respError500(res, e);
      }
    });

    app.get(`${constant.PATHNAME_EXCHANGE_UPBIT}/candles/months/:market`, async (req, res) => {
      const { market } = req.params;
      const { count, to } = req.query;
      try {
        const result = await upbit.candlesMonths({market, count, to});
        res.set({'Content-Type': 'application/json; charset=utf-8'})
        .status(200).send(JSON.stringify(result, undefined, ' '));
      } catch (e) {
        this.respError500(res, e);
      }
    });

    // ALL Markets Minutes Tick
    app.get(`${constant.PATHNAME_EXCHANGE_UPBIT}/currency/:currency/candles/minutes/:unit`, async (req, res) => {
      const { unit, currency } = req.params;
      const { count, to } = req.query;
      let base = BaseCurrency.BTC;
      switch (currency) {
        case 'btc':
          base = BaseCurrency.BTC;
          break;
        case 'eth':
          base = BaseCurrency.ETH;
          break;
        case 'usd':
          base = BaseCurrency.USD;
          break;
        case 'usdt':
          base = BaseCurrency.USDT;
          break;
        case 'krw':
          base = BaseCurrency.KRW;
          break;
        default:
        res.status(400).send({ result: 'error', message: 'wrong currency'});
      }

      try {
        const result = await upbitProcessor.getAllCandlesMinutes(base, unit, count, to);
        res.set({'Content-Type': 'application/json; charset=utf-8'})
        .status(200).send(JSON.stringify(result, undefined, ' '));
      } catch (e) {
        this.respError500(res, e);
      }
    });

    // ALL Markets days Tick
    app.get(`${constant.PATHNAME_EXCHANGE_UPBIT}/currency/:currency/candles/days`, async (req, res) => {
      const { currency } = req.params;
      const { count, to } = req.query;
      let base = BaseCurrency.BTC;
      switch (currency) {
        case 'btc':
          base = BaseCurrency.BTC;
          break;
        case 'eth':
          base = BaseCurrency.ETH;
          break;
        case 'usd':
          base = BaseCurrency.USD;
          break;
        case 'usdt':
          base = BaseCurrency.USDT;
          break;
        case 'krw':
          base = BaseCurrency.KRW;
          break;
        default:
        res.status(400).send({ result: 'error', message: 'wrong currency'});
      }

      try {
        const result = await upbitProcessor.getAllCandlesDays(base, count, to);
        res.set({'Content-Type': 'application/json; charset=utf-8'})
        .status(200).send(JSON.stringify(result, undefined, ' '));
      } catch (e) {
        this.respError500(res, e);
      }
    });
  }

  private static respError500(res, e) {
    console.error(e);
    res.status(500).send({ result: 'error', message: e});
  }
}

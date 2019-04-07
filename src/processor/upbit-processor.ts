import * as Bluebird from 'bluebird';
import * as _ from 'lodash';
import { Upbit } from 'upbit-js';
import { constant } from '../constant';
import { ERROR_CLASS, getError } from '../errors/error-common';
import { BaseCurrency, PriceUnit } from '../interface';
import { Exchange } from '../interface/interface-exchange';
class UpbitProcessor implements Exchange {

  public static getUpbitProcessor(): UpbitProcessor {
    if (!UpbitProcessor.upbitProcessor) {
      UpbitProcessor.upbitProcessor = new UpbitProcessor();
    }
    return UpbitProcessor.upbitProcessor;
  }

  public static getUpbit(): Upbit {
    if (!UpbitProcessor.upbit) {
      UpbitProcessor.upbit = new Upbit();
    }
    return UpbitProcessor.upbit;
  }

  private static upbitProcessor: UpbitProcessor | undefined = undefined;
  private static upbit: Upbit = new Upbit();

  private constructor() {

  }

  public async getAllCandlesMinutes( param: { baseCurrency: BaseCurrency, unit: number,
                                              count?: number, to?: string, squad?: number }) {
    const { baseCurrency, unit, count, to, squad } = param;
    const list: string[] | undefined = this.getListByBaseCurrency(baseCurrency, squad || 0);
    const result: {[key: string]: PriceUnit} = {};
    const resultArray: any[] = [];
    const chartArray: any[] = [];

    // BTC is base
    const baseMarket = 'KRW-BTC';
    let KRW_BTC_RAW = await UpbitProcessor.getUpbit().candlesMinutes( { unit, market: baseMarket, count, to});
    KRW_BTC_RAW = KRW_BTC_RAW.reverse();
    await Promise.all(
      KRW_BTC_RAW.map( async node => {
        const tradePrice = node.trade_price;
        const obj = {
          datetimeUtc: node.candle_date_time_utc,
          datetimeKst: node.candle_date_time_kst,
          tradePrice: {}
        };
        obj.tradePrice[`${baseMarket}`] = tradePrice;
        resultArray.push(obj);
      })
    );

    for (const market of list) {
      await Bluebird.delay(200);
      try {
        const res = await UpbitProcessor.getUpbit().candlesMinutes( { unit, market, count, to});
        if (res.length < 0) return;

        await Promise.all(
          res.map( async node => {
            const datetimeUtc = node.candle_date_time_utc;
            const datetimeKst = node.candle_date_time_kst;
            const tradePrice = node.trade_price;
            const item = result[datetimeUtc];
            if (_.isNil(item)) {
              const obj = {
                datetimeUtc,
                datetimeKst,
                tradePrice: { }
              };
              obj.tradePrice[`${market}`] = tradePrice;
              result[datetimeUtc] = obj;
            } else {
              result[datetimeUtc].tradePrice[`${market}`] = tradePrice;
            }
          })
        );
        await Promise.all(
          res.map( async node => {
            const datetimeUtc = node.candle_date_time_utc;
            const tradePrice = node.trade_price;
            const idx = resultArray.findIndex( element => {
              return element.datetimeUtc === datetimeUtc;
            });
            if (resultArray[idx]) resultArray[idx].tradePrice[`${market}`] = tradePrice;
          })
        );

      } catch (e) {
        const error = getError(ERROR_CLASS.EXCHG_UPBIT, e);
        console.error(error);
        return;
      }
    }

    const firstNode = resultArray[0];
    await Promise.all(
      resultArray.map( async node => {
        const dataset: any = [];
        dataset.push(node.datetimeKst);

        await Promise.all(
          list.map( async market => {
            const rate = ( node.tradePrice[market] / firstNode.tradePrice[market] ) - 1;
            dataset.push(rate);
          })
        );
        chartArray.push( dataset );
      })
    );

    _.set(result, 'unit', unit);
    _.set(result, 'data', resultArray);
    _.set(result, 'chart', chartArray);
    _.set(result, 'column', list);

    return result;
  }

  public async getAllCandlesDays( param: { baseCurrency: BaseCurrency,
                                           count?: number, to?: string, squad?: number }) {
    const { baseCurrency, count, to, squad } = param;
    const list: string[] | undefined = this.getListByBaseCurrency(baseCurrency, squad || 0);
    const result: {[key: string]: PriceUnit} = {};
    const resultArray: any[] = [];
    const chartArray: any[] = [];

    // set base KRW-BTC
    const baseMarket = 'KRW-BTC';
    let KRW_BTC_RAW = await UpbitProcessor.getUpbit().candlesDays( { market: baseMarket, count, to});
    KRW_BTC_RAW = KRW_BTC_RAW.reverse();
    await Promise.all(
      KRW_BTC_RAW.map( async node => {
        const tradePrice = node.trade_price;
        const obj = {
          datetimeUtc: node.candle_date_time_utc,
          datetimeKst: node.candle_date_time_kst,
          tradePrice: {}
        };
        obj.tradePrice[`${baseMarket}`] = tradePrice;
        resultArray.push(obj);
      })
    );

    for (const market of list) {
      await Bluebird.delay(200);
      try {
        const res = await UpbitProcessor.getUpbit().candlesDays( { market, count, to});
        if (res.length < 0) return;

        await Promise.all(
          res.map( async node => {
            const datetimeUtc = node.candle_date_time_utc;
            const datetimeKst = node.candle_date_time_kst;
            const tradePrice = node.trade_price;
            const item = result[datetimeUtc];
            if (_.isNil(item)) {
              const obj = {
                datetimeUtc,
                datetimeKst,
                tradePrice: { }
              };
              obj.tradePrice[`${market}`] = tradePrice;
              result[datetimeUtc] = obj;
            } else {
              result[datetimeUtc].tradePrice[`${market}`] = tradePrice;
            }
          })
        );

        await Promise.all(
          res.map( async node => {
            const datetimeUtc = node.candle_date_time_utc;
            const tradePrice = node.trade_price;
            const idx = resultArray.findIndex( element => {
              return element.datetimeUtc === datetimeUtc;
            });
            if (resultArray[idx]) resultArray[idx].tradePrice[`${market}`] = tradePrice;
          })
        );

      } catch (e) {
        console.error(getError(ERROR_CLASS.EXCHG_UPBIT, e));
      }
    }
    const firstNode = resultArray[0];
    await Promise.all(
      resultArray.map( async node => {
        const dataset: any = [];
        dataset.push(node.datetimeKst);

        await Promise.all(
          list.map( async market => {
            const rate = ( node.tradePrice[market] / firstNode.tradePrice[market] ) - 1;
            dataset.push(rate);
          })
        );
        chartArray.push( dataset );
      })
    );

    _.set(result, 'data', resultArray);
    _.set(result, 'column', list);
    _.set(result, 'chart', chartArray);

    return result;
  }

  private getListByBaseCurrency(baseCurrency: BaseCurrency, squad: number) {
    let list = constant.UPBIT_KRW_MARKET_SQUADS[0];
    switch (baseCurrency) {
      case BaseCurrency.BTC:
        list = constant.UPBIT_ALL_BTC_MARKET_LIST;
        break;
      case BaseCurrency.ETH:
        list = constant.UPBIT_ALL_ETH_MARKET_LIST;
        break;
      case BaseCurrency.USDT:
        list = constant.UPBIT_ALL_USDT_MARKET_LIST;
        break;
      case BaseCurrency.KRW:
        list = constant.UPBIT_KRW_MARKET_SQUADS[squad];
        break;
      case BaseCurrency.USD:  // not used
      default:
    }
    return list;
  }

}

export const upbitProcessor: UpbitProcessor = UpbitProcessor.getUpbitProcessor();
export const upbit: Upbit = UpbitProcessor.getUpbit();

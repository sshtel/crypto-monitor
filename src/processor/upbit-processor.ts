import * as _ from 'lodash';
import { Upbit } from 'upbit-js';
import { constant } from '../constant';
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

  public async getAllCandlesMinutes(baseCurrency: BaseCurrency, unit: number, count?: number, to?: string) {
    const list: string[] | undefined = this.getListByBaseCurrency(baseCurrency);
    const result: {[key: string]: PriceUnit} = {};
    // const resultMap: Map<string, PriceUnit> = new Map();
    const resultArray: any[] = [];

    // BTC is base
    const baseMarket = 'KRW-BTC';
    const KRW_BTC_RAW = await UpbitProcessor.getUpbit().candlesMinutes( { unit, market: baseMarket, count, to});
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
    await Promise.all(
      list.map( async market => {
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
            console.error(e);
            return;
        }
      })
    );

    _.set(result, 'unit', unit);
    _.set(result, 'data', resultArray);
    _.set(result, 'column', list);

    return result;
  }

  public async getAllCandlesDays(baseCurrency: BaseCurrency, count?: number, to?: string) {
    const list: string[] | undefined = this.getListByBaseCurrency(baseCurrency);
    const result: {[key: string]: PriceUnit} = {};
    const resultArray: any[] = [];
    const baseMarket = 'KRW-BTC';
    const KRW_BTC_RAW = await UpbitProcessor.getUpbit().candlesDays( { market: baseMarket, count, to});

    // set base KRW-BTC
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

    await Promise.all(
      list.map( async market => {
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
            console.error(e);
            return;
        }
      })
    );

    _.set(result, 'data', resultArray);
    _.set(result, 'column', list);

    return result;
  }

  private getListByBaseCurrency(baseCurrency: BaseCurrency) {
    let list = constant.UPBIT_ALL_KRW_MARKET_LIST;
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
      case BaseCurrency.USD:  // not used
      default:
        list = constant.UPBIT_ALL_KRW_MARKET_LIST;
    }
    return list;
  }

}

export const upbitProcessor: UpbitProcessor = UpbitProcessor.getUpbitProcessor();
export const upbit: Upbit = UpbitProcessor.getUpbit();

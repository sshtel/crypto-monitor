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
    let list: string[] = [];
    switch (baseCurrency) {
      case BaseCurrency.KRW:
        list = constant.UPBIT_ALL_KRW_MARKET_LIST;
        break;
      case BaseCurrency.BTC:
        list = constant.UPBIT_ALL_BTC_MARKET_LIST;
        break;
      case BaseCurrency.ETH:
        list = constant.UPBIT_ALL_ETH_MARKET_LIST;
        break;
      case BaseCurrency.USDT:
        list = constant.UPBIT_ALL_USDT_MARKET_LIST;
        break;
      case BaseCurrency.USD:
      default:
        return;
    }
    const result: {[key: string]: PriceUnit} = {};

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

        } catch (e) {
            console.error(e);
            return;
        }
      })
    );
    _.set(result, 'unit', unit);

    return result;
  }

  public async getAllCandlesDays(count?: number, to?: string) {
    const list = constant.UPBIT_ALL_KRW_MARKET_LIST;
    const result: {[key: string]: PriceUnit} = {};

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

        } catch (e) {
            console.error(e);
            return;
        }
      })
    );
    return result;
  }

}

export const upbitProcessor: UpbitProcessor = UpbitProcessor.getUpbitProcessor();
export const upbit: Upbit = UpbitProcessor.getUpbit();

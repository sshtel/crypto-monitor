import * as Bluebird from 'bluebird';
import * as _ from 'lodash';
import { Upbit } from 'upbit-js';
import { constant } from '../constant';
import { ERROR_CLASS, getError } from '../errors/error-common';
import { BaseCurrency, CandleDayItem, CandleMinuteItem } from '../interface';
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
    const result: {[key: string]: CandleMinuteItem} = {};
    const resultArray: CandleMinuteItem[] = [];
    const chartArray: any[] = [];
    const chartArrayAcctPrice: any[] = [];

    // BTC is base
    const baseMarket = 'KRW-BTC';
    await this.setSortedBaseArrayForMinutes(resultArray, baseMarket, unit, count, to);
    // let KRW_BTC_RAW = await UpbitProcessor.getUpbit().candlesMinutes( { unit, market: baseMarket, count, to});
    // KRW_BTC_RAW = KRW_BTC_RAW.reverse();
    // await Promise.all(
    //   KRW_BTC_RAW.map( async node => {
    //     const tradePrice = node.trade_price;
    //     const accTradePrice = node.candle_acc_trade_price;
    //     const obj: CandleMinuteItem = {
    //       datetimeUtc: node.candle_date_time_utc,
    //       datetimeKst: node.candle_date_time_kst,
    //       tradePrice: {},
    //       accTradePrice: {}
    //     };
    //     _.set(obj, `tradePrice.${baseMarket}`, tradePrice);
    //     _.set(obj, `accTradePrice.${baseMarket}`, accTradePrice);
    //     resultArray.push(obj);
    //   })
    // );

    for (const market of list) {
      await Bluebird.delay(200);
      try {
        const res = await UpbitProcessor.getUpbit().candlesMinutes( { unit, market, count, to});
        if (res.length < 0) return;

        // await Promise.all(
        //   res.map( async node => {
        //     const datetimeUtc = node.candle_date_time_utc;
        //     const datetimeKst = node.candle_date_time_kst;
        //     const tradePrice = node.trade_price;
        //     const accTradePrice = node.candle_acc_trade_price;
        //     const item = result[datetimeUtc];
        //     if (_.isNil(item)) {
        //       const obj: CandleMinuteItem = {
        //         datetimeUtc,
        //         datetimeKst,
        //         tradePrice: {},
        //         accTradePrice: {}
        //       };
        //       obj.tradePrice[`${market}`] = tradePrice;
        //       obj.accTradePrice[`${market}`] = accTradePrice;
        //       result[datetimeUtc] = obj;
        //     } else {
        //       result[datetimeUtc].tradePrice[`${market}`] = tradePrice;
        //       result[datetimeUtc].accTradePrice[`${market}`] = accTradePrice;
        //     }
        //   })
        // );
        await Promise.all(
          res.map( async node => {
            const datetimeUtc = node.candle_date_time_utc;
            const tradePrice = node.trade_price;
            const accTradePrice = node.candle_acc_trade_price;
            const idx = resultArray.findIndex( element => {
              return element.datetimeUtc === datetimeUtc;
            });
            if (resultArray[idx]) {
              _.set(resultArray, `[${idx}].tradePrice.${market}`, tradePrice);
              _.set(resultArray, `[${idx}].accTradePrice.${market}`, accTradePrice);
            }
          })
        );

      } catch (e) {
        const error = getError(ERROR_CLASS.EXCHG_UPBIT, e);
        console.error(error);
        return;
      }
    }

    const firstNode = resultArray[0];
    for (const node of resultArray) {
      const dataset: any[] = [];
      const datasetAcctPrice: any[] = [];
      const datetimeKst = node.datetimeKst;
      dataset.push(datetimeKst);
      datasetAcctPrice[0] = (datetimeKst);

      await Promise.all(
        list.map( async market => {
          const rate = this.getPriceChangeRate(_.get(node, `tradePrice.${market}`),
                                               _.get(firstNode, `tradePrice.${market}`));
          dataset.push(rate);
          datasetAcctPrice.push( _.get(node, `accTradePrice.${market}`));
        })
      );
      chartArray.push( dataset );
      chartArrayAcctPrice.push( datasetAcctPrice );
    }

    _.set(result, 'unit', unit);
    _.set(result, 'chart', chartArray);
    _.set(result, 'chartAccPrice', chartArrayAcctPrice);
    _.set(result, 'column', list);

    return result;
  }

  public async getAllCandlesDays( param: { baseCurrency: BaseCurrency,
                                           count?: number, to?: string, squad?: number }) {
    const { baseCurrency, count, to, squad } = param;
    const list: string[] | undefined = this.getListByBaseCurrency(baseCurrency, squad || 0);
    const result: {[key: string]: CandleDayItem} = {};
    const resultArray: CandleDayItem[] = [];
    const chartArray: any[] = [];
    const chartArrayAcctPrice: any[] = [];

    // set base KRW-BTC
    const baseMarket = 'KRW-BTC';
    await this.setSortedBaseArrayForDays(resultArray, baseMarket, count, to);
    // let KRW_BTC_RAW = await UpbitProcessor.getUpbit().candlesDays( { market: baseMarket, count, to});
    // KRW_BTC_RAW = KRW_BTC_RAW.reverse();
    // await Promise.all(
    //   KRW_BTC_RAW.map( async node => {
    //     const tradePrice = node.trade_price;
    //     const accTradePrice = node.candle_acc_trade_price;
    //     const obj: CandleDayItem = {
    //       datetimeUtc: node.candle_date_time_utc,
    //       datetimeKst: node.candle_date_time_kst,
    //       tradePrice: {},
    //       accTradePrice: {}
    //     };
    //     obj.tradePrice[`${baseMarket}`] = tradePrice;
    //     obj.accTradePrice[`${baseMarket}`] = accTradePrice;
    //     resultArray.push(obj);
    //   })
    // );

    for (const market of list) {
      await Bluebird.delay(200);
      try {
        const res = await UpbitProcessor.getUpbit().candlesDays( { market, count, to});
        if (res.length < 0) return;

        // await Promise.all(
        //   res.map( async node => {
        //     const datetimeUtc = node.candle_date_time_utc;
        //     const datetimeKst = node.candle_date_time_kst;
        //     const tradePrice = node.trade_price;
        //     const accTradePrice = node.candle_acc_trade_price;
        //     const item = result[datetimeUtc];
        //     if (_.isNil(item)) {
        //       const obj: CandleDayItem = {
        //         datetimeUtc,
        //         datetimeKst,
        //         tradePrice: {},
        //         accTradePrice: {}
        //       };
        //       _.set(obj, `tradePrice.${market}`, tradePrice);
        //       _.set(obj, `accTradePrice.${market}`, accTradePrice);
        //       _.set(result, `datetimeUtc`, obj);
        //       // obj.tradePrice[`${market}`] = tradePrice;
        //       // obj.accTradePrice[`${market}`] = accTradePrice;
        //       // result[datetimeUtc] = obj;
        //     } else {
        //       _.set(result, `datetimeUtc.tradePrice.${market}`, tradePrice);
        //       _.set(result, `datetimeUtc.accTradePrice.${market}`, accTradePrice);
        //       // result[datetimeUtc].tradePrice[`${market}`] = tradePrice;
        //       // result[datetimeUtc].accTradePrice[`${market}`] = accTradePrice;
        //     }
        //   })
        // );

        await Promise.all(
          res.map( async node => {
            const datetimeUtc = node.candle_date_time_utc;
            const tradePrice = node.trade_price;
            const accTradePrice = node.candle_acc_trade_price;
            const idx = resultArray.findIndex( element => {
              return element.datetimeUtc === datetimeUtc;
            });
            if (resultArray[idx]) {
              _.set(resultArray, `[${idx}].tradePrice.${market}`, tradePrice);
              _.set(resultArray, `[${idx}].accTradePrice.${market}`, accTradePrice);
            }
          })
        );

      } catch (e) {
        console.error(getError(ERROR_CLASS.EXCHG_UPBIT, e));
      }
    }
    const firstNode = resultArray[0];
    for (const node of resultArray) {
      const dataset: any = [];
      const datasetAcctPrice: any = [];
      dataset.push(node.datetimeKst);
      datasetAcctPrice.push(node.datetimeKst);

      await Promise.all(
        list.map( async market => {
          const rate = this.getPriceChangeRate(_.get(node, `tradePrice.${market}`),
                                               _.get(firstNode, `tradePrice.${market}`));
          dataset.push(rate);
          datasetAcctPrice.push( _.get(node, `accTradePrice.${market}`));
        })
      );
      chartArray.push( dataset );
      chartArrayAcctPrice.push( datasetAcctPrice );
    }

    _.set(result, 'column', list);
    _.set(result, 'chart', chartArray);
    _.set(result, 'chartAccPrice', chartArrayAcctPrice);

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

  private getPriceChangeRate(currentPrice: number, firstPrice: number) {
    return ( currentPrice / firstPrice ) - 1;
  }

  private async setSortedBaseArrayForDays(resultArray: CandleDayItem[],
                                          baseMarket: string, count?: number, to?: string) {
    let KRW_BTC_RAW = await UpbitProcessor.getUpbit().candlesDays( { market: baseMarket, count, to});
    KRW_BTC_RAW = KRW_BTC_RAW.reverse();
    await Promise.all(
      KRW_BTC_RAW.map( async node => {
        const tradePrice = node.trade_price;
        const accTradePrice = node.candle_acc_trade_price;
        const obj: CandleDayItem = {
          datetimeUtc: node.candle_date_time_utc,
          datetimeKst: node.candle_date_time_kst,
          tradePrice: {},
          accTradePrice: {}
        };
        obj.tradePrice[`${baseMarket}`] = tradePrice;
        obj.accTradePrice[`${baseMarket}`] = accTradePrice;
        resultArray.push(obj);
      })
    );
  }

  private async setSortedBaseArrayForMinutes(resultArray: CandleMinuteItem[],
                                             baseMarket: string, unit: number, count?: number, to?: string) {
    let KRW_BTC_RAW = await UpbitProcessor.getUpbit().candlesMinutes( { unit, market: baseMarket, count, to});
    KRW_BTC_RAW = KRW_BTC_RAW.reverse();
    await Promise.all(
      KRW_BTC_RAW.map( async node => {
        const tradePrice = node.trade_price;
        const accTradePrice = node.candle_acc_trade_price;
        const obj: CandleMinuteItem = {
          datetimeUtc: node.candle_date_time_utc,
          datetimeKst: node.candle_date_time_kst,
          tradePrice: {},
          accTradePrice: {}
        };
        _.set(obj, `tradePrice.${baseMarket}`, tradePrice);
        _.set(obj, `accTradePrice.${baseMarket}`, accTradePrice);
        resultArray.push(obj);
      })
    );
  }

}

export const upbitProcessor: UpbitProcessor = UpbitProcessor.getUpbitProcessor();
export const upbit: Upbit = UpbitProcessor.getUpbit();

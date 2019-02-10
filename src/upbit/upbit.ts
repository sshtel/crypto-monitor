
import * as fs from 'fs';
import { Auth } from './auth';
import * as quotation from './quotation';
export class Upbit {

  private auth: Auth;
  private marketList = [];
  constructor() {
    this.auth = new Auth();
  }

  public async updateMarketAll() {

    try {
      this.marketList = await quotation.marketAll();
    } catch (e) {
      const marketAll = await fs.readFileSync('./marketAll.json', { encoding: 'utf-8'});
      this.marketList = JSON.parse(marketAll);
    }
  }

  public setAuth(accessToken: string, secretToken: string) {
    this.auth = new Auth();
  }

  public getAccessToken() {
    return this.auth.getTokens().accessToken;
  }
  public getSecretToken() {
    return this.auth.getTokens().secretToken;
  }

  public getMarketList() {
    return this.
    marketList;
  }

  public async marketAll() {
    return quotation.marketAll();
  }
  public async candlesMinutes(param: {unit: number, market: string, count?: number, to?: string}) {
    return quotation.candlesMinutes(param);
  }
  public async candlesDays(param: {market: string, count?: number, to?: string}) {
    return quotation.candlesDays(param);
  }
  public async candlesWeeks(param: {market: string, count?: number, to?: string}) {
    return quotation.candlesWeeks(param);
  }
  public async candlesMonths(param: {market: string, count?: number, to?: string}) {
    return quotation.candlesMonths(param);
  }
  public async tradesTicks(param: {market: string, to: string, count: number, cursor: string}) {
    return quotation.tradesTicks(param);
  }
  public async ticker(param: {markets: string}) {
    return quotation.ticker(param);
  }
  public async orderBook(param: {markets: string}) {
    return quotation.orderBook(param);
  }
}

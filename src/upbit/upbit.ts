
import * as fs from 'fs';
import { Auth } from './auth';
import * as market from './quotation';

export class Upbit {

  private auth: Auth;
  private marketList = [];
  constructor(accessToken: string, secretToken: string) {
    this.auth = new Auth(accessToken, secretToken);
  }

  public async updateMarketAll() {
    try {
      this.marketList = await market.marketAll();
    } catch (e) {
      const marketAll = await fs.readFileSync('./marketAll.json', { encoding: 'utf-8'});
      this.marketList = JSON.parse(marketAll);
    }
  }

  public setAuth(accessToken: string, secretToken: string) {
    this.auth = new Auth(accessToken, secretToken);
  }

  public getToken() {
    this.auth.getTokens();
  }

  public getMarketList() { return this.marketList; }

}

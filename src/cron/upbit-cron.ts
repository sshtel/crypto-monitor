import * as EventEmitter from 'events';
import { Upbit } from '../upbit/upbit';

export class UpbitCron extends EventEmitter {
  private upbit: Upbit;

  private orderBook = {};

  private cronJob;
  constructor() {
    super();
    this.upbit = new Upbit();
    this.cronOrderBook = this.cronOrderBook.bind(this);
    this.cronOrderBook();
    this.cronCandleMinute = this.cronCandleMinute.bind(this);
    this.cronCandleMinute();
  }
  stop() {
    clearTimeout(this.cronJob);
  }

  public getOrderBook() { return this.orderBook; }
  async cronOrderBook() {
    if (this.upbit) {
      this.orderBook = await this.upbit.orderBook({markets: 'KRW-BTC'});
      this.emit('orderBook', this.orderBook);
    }
    setTimeout( this.cronOrderBook, 1000);
  }
  async cronCandleMinute() {
    if (this.upbit) {
      const candleMinute = await this.upbit.candlesMinutes({unit: 1, market: 'KRW-BTC', count: 1});
      this.emit('candlesMinutes', candleMinute);
    }
    setTimeout( this.cronCandleMinute, 1000);
  }

}

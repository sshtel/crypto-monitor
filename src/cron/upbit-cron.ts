import { Upbit } from '../upbit/upbit';

function cronJob(obj: UpbitCron) {
  obj.updateOrderBook();
}

export class UpbitCron {
  private upbit: Upbit;

  private orderBook = {};
  constructor() {
    this.upbit = new Upbit();
    this.cronOrderBook();
    cronJob(this);
  }

  public updateOrderBook() {
    // this.upbit.orderBook({ markets: 'KRW-BTC'}).then( value => {
    //   this.orderBook = value;
    //   console.log('orderBook updated');
    //   console.log(value);
    // }).catch( error => {
    //   console.log('error!!!');
    //   console.error(error);
    // });
  }
  public getOrderBook() {
    return this.orderBook;
  }

  private async cronOrderBook() {
    console.log(this.upbit);
    setTimeout( this.cronOrderBook, 1000);
  }
}

export const upbitCron = new UpbitCron();

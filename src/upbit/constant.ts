
export class Constant {

  public UPBIT_ACCESS_TOKEN: string | undefined = '';
  public UPBIT_SECRET_TOKEN: string | undefined = '';

  public UPBIT_URL_V1: string                 = 'api.upbit.com/v1';
  public UPBIT_URL_MARKET_ALL: string         = 'market/all';
  public UPBIT_URL_CANDLES_MINUTE: string     = 'candles/minutes';
  public UPBIT_URL_CANDLES_DAYS: string       = 'candles/days';
  public UPBIT_URL_CANDLES_WEEKS: string      = 'candles/weeks';
  public UPBIT_URL_CANDLES_MONTHS: string     = 'candles/months';
  public UPBIT_URL_TRADES_TICKS: string       = 'trades/ticks';
  public UPBIT_URL_TICKER: string             = 'ticker';
  public UPBIT_URL_ORDERBOOK: string          = 'orderbook';

  constructor() {
    this.UPBIT_ACCESS_TOKEN = process.env.UPBIT_ACCESS_TOKEN;
    this.UPBIT_SECRET_TOKEN = process.env.UPBIT_SECRET_TOKEN;
  }

}

export const constant = new Constant();

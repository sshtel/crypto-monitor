
export interface CandleMinuteItem {
  datetimeUtc: string;
  datetimeKst: string;
  tradePrice: Object;
  accTradePrice: Object;
}

export interface CandleDayItem {
  datetimeUtc: string;
  datetimeKst: string;
  tradePrice: Object;
  accTradePrice: Object;
}

export enum BaseCurrency {
  BTC,
  ETH,
  USD,
  KRW,
  USDT
}

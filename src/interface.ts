export interface PriceUnit {
  datetimeUtc: string;
  datetimeKst: string;
  tradePrice: {};
}

export enum BaseCurrency {
  BTC,
  ETH,
  USD,
  KRW,
  USDT
}

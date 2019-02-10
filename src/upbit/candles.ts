import * as request from 'superagent';
import * as url from 'url';
import { constant } from './constant';
export async function candlesMinutes(param: {unit: number, market: string, count?: number, to?: string}) {
  const {unit, market, count, to } = param;
  const uri = url.format({
    protocol: 'https',
    hostname: constant.UPBIT_URL_CANDLES_MINUTE,
    pathname: `${unit}`
  });
  const res = await request.get(uri)
    .query({ market })
    .query({ count })
    .query({ to });
  return res.body;
}

export async function candlesDays(param: {market: string, count?: number, to?: string}) {
  const { market, count, to } = param;
  const uri = url.format({
    protocol: 'https',
    hostname: constant.UPBIT_URL_CANDLES_DAYS
  });
  const res = await request.get(uri)
    .query({ market })
    .query({ count })
    .query({ to });
  return res.body;
}

export async function candlesWeeks(param: {market: string, count?: number, to?: string}) {
  const { market, count, to } = param;
  const uri = url.format({
    protocol: 'https',
    hostname: constant.UPBIT_URL_CANDLES_WEEKS
  });
  const res = await request.get(uri)
    .query({ market })
    .query({ count })
    .query({ to });
  return res.body;
}

export async function candlesMonths(param: {market: string, count?: number, to?: string}) {
  const { market, count, to } = param;
  const uri = url.format({
    protocol: 'https',
    hostname: constant.UPBIT_URL_CANDLES_MONTHS
  });
  const res = await request.get(uri)
    .query({ market })
    .query({ count })
    .query({ to });
  return res.body;
}

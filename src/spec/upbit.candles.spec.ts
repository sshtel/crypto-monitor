import * as _ from 'lodash';
import { Upbit } from 'upbit-js';

describe('Upbit API candles', () => {
  const upbit = new Upbit();

  beforeEach( (async () => {

  }));

  it('caldles minutes', (async () => {
    const count = 5;
    const market = 'KRW-BTC';
    const unit = 1;
    const res = await upbit.candlesMinutes({unit, market, count});
    expect(res.length).toBe(count);
    expect(_.sample(res).market).toBe(market);
    expect(_.sample(res).unit).toBe(unit);
  }));

  it('caldles days', (async () => {
    const count = 5;
    const market = 'KRW-BTC';
    const res = await upbit.candlesDays({market, count});
    expect(res.length).toBe(count);
    expect(_.sample(res).market).toBe(market);
  }));

  it('caldles weeks', (async () => {
    const count = 5;
    const market = 'KRW-BTC';
    const res = await upbit.candlesWeeks({market, count});
    expect(res.length).toBe(count);
    expect(_.sample(res).market).toBe(market);
  }));

  it('caldles months', (async () => {
    const count = 5;
    const market = 'KRW-BTC';
    const res = await upbit.candlesMonths({market, count});
    expect(res.length).toBe(count);
    expect(_.sample(res).market).toBe(market);
  }));

});

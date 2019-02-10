import { candlesMinutes
} from '../upbit/candles';

describe('Upbit API candles', () => {

  beforeEach( (async () => {
  }));

  it('caldles minutes', (async () => {
    candlesMinutes({unit: 1, market: 'KRW-BTC', count: 10});
  }));

});

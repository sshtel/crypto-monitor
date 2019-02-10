import { candlesMinutes
} from '../upbit/quotation';

describe('Upbit API candles', () => {

  beforeEach( (async () => {
  }));

  it('caldles minutes', (async () => {
    candlesMinutes({unit: 1, market: 'KRW-BTC', count: 10});
  }));

});

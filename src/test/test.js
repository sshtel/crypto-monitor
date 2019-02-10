const candlesMinutes = require('../../dist/upbit/candles').candlesMinutes;
const candlesDays = require('../../dist/upbit/candles').candlesDays;
const candlesWeeks = require('../../dist/upbit/candles').candlesWeeks;
const candlesMonths = require('../../dist/upbit/candles').candlesMonths;

candlesMinutes({unit: 1, market: 'KRW-BTC', count: 2}).then( (value) => {
  console.log('resolve');
  console.log(value);
})
.catch( () => {
  console.log('reject');
})

candlesDays({market: 'KRW-BTC', count: 2}).then( (value) => {
  console.log('resolve');
  console.log(value);
})
.catch( () => {
  console.log('reject');
})

candlesWeeks({market: 'KRW-BTC', count: 2}).then( (value) => {
  console.log('resolve');
  console.log(value);
})
.catch( () => {
  console.log('reject');
})

candlesMonths({market: 'KRW-BTC', count: 2}).then( (value) => {
  console.log('resolve');
  console.log(value);
})
.catch( () => {
  console.log('reject');
})

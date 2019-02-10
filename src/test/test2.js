const marketAll = require('../../dist/upbit/quotation').marketAll;
const tradesTicks = require('../../dist/upbit/quotation').tradesTicks;
const ticker = require('../../dist/upbit/quotation').ticker;
const orderBook = require('../../dist/upbit/quotation').orderBook;

marketAll().then( (value) => {
  console.log('resolve');
  console.log(value);
})
.catch( (err) => {
  console.log('reject');
  console.log(err);
})

tradesTicks({market: 'KRW-BTC', count: 2}).then( (value) => {
  console.log('resolve');
  console.log(value);
})
.catch( () => {
  console.log('reject');
})

ticker({markets: 'KRW-BTC,KRW-XRP,KRW-ETH'}).then( (value) => {
  console.log('resolve');
  console.log(value);
})
.catch( () => {
  console.log('reject');
})


orderBook({markets: 'KRW-BTC'}).then( (value) => {
  console.log('resolve');
  console.log(value[0].orderbook_units[0]);
})
.catch( () => {
  console.log('reject');
})

class Constant {
  // backend infos
  public MONBO_DB_HOST = '';
  public MONGO_DB_PORT = '';

  // pathnames
  public PATHNAME_EXCHANGE_UPBIT = '/exchange/upbit';

  // processing values

  public UPBIT_MAJOR_MARKET_LIST = [];
  public UPBIT_MINOR_MARKET_LIST = [

  ];

  /* tslint:disable */
  public UPBIT_KRW_MARKET_SQUADS = [
    [ 'KRW-BTC', 'KRW-ETH',  'KRW-XRP', 'KRW-EOS', 'KRW-TRX', 'KRW-XLM', 'KRW-ADA', 'KRW-BCH', 'KRW-LTC', 'KRW-ZEC' ],
    [ 'KRW-QTUM', 'KRW-OMG', 'KRW-CVC', 'KRW-POLY', 'KRW-STEEM', 'KRW-GRS', 'KRW-ZIL', 'KRW-IOTA', 'KRW-ARK', 'KRW-NEO' ]
  ];
  /* tslint:enable */

  public UPBIT_ALL_KRW_MARKET_LIST = [
  'KRW-BTC', 'KRW-DASH', 'KRW-ETH', 'KRW-NEO', 'KRW-MTL', 'KRW-LTC', 'KRW-STRAT', 'KRW-XRP', 'KRW-ETC', 'KRW-OMG',
  'KRW-SNT', 'KRW-WAVES', 'KRW-PIVX', 'KRW-XEM', 'KRW-ZEC', 'KRW-XMR', 'KRW-QTUM', 'KRW-GNT', 'KRW-LSK', 'KRW-STEEM',
  'KRW-XLM', 'KRW-ARDR', 'KRW-KMD', 'KRW-ARK', 'KRW-STORJ', 'KRW-GRS', 'KRW-VTC', 'KRW-REP', 'KRW-EMC2', 'KRW-ADA',
  'KRW-SBD', 'KRW-TIX', 'KRW-POWR', 'KRW-MER', 'KRW-BTG', 'KRW-ICX', 'KRW-EOS', 'KRW-STORM', 'KRW-TRX', 'KRW-MCO',
  'KRW-SC', 'KRW-GTO', 'KRW-IGNIS', 'KRW-ONT', 'KRW-DCR', 'KRW-ZIL', 'KRW-POLY', 'KRW-ZRX', 'KRW-SRN', 'KRW-LOOM',
  'KRW-BCH', 'KRW-ADT', 'KRW-ADX', 'KRW-BAT', 'KRW-IOST', 'KRW-DMT', 'KRW-RFR', 'KRW-CVC', 'KRW-IQ', 'KRW-IOTA',
  'KRW-OST', 'KRW-MFT', 'KRW-ONG', 'KRW-GAS', 'KRW-MEDX', 'KRW-UPP', 'KRW-ELF', 'KRW-KNC', 'KRW-BSV', 'KRW-THETA',
  'KRW-WAX', 'KRW-EDR', 'KRW-QKC', 'KRW-CPT', 'KRW-BTT'];

  public UPBIT_ALL_BTC_MARKET_LIST = [
    'BTC-ETH', 'BTC-LTC', 'BTC-STRAT', 'BTC-XRP', 'BTC-ETC', 'BTC-OMG', 'BTC-CVC', 'BTC-DGB', 'BTC-PAY', 'BTC-SC',
    'BTC-SNT', 'BTC-DASH', 'BTC-XVG', 'BTC-WAVES', 'BTC-NMR', 'BTC-SYNX', 'BTC-PIVX', 'BTC-GBYTE', 'BTC-XEM', 'BTC-ZEC',
    'BTC-XMR', 'BTC-LBC', 'BTC-QTUM', 'BTC-GNT', 'BTC-NXT', 'BTC-BAT', 'BTC-XEL', 'BTC-EDG', 'BTC-LSK', 'BTC-RDD',
    'BTC-DCT', 'BTC-STEEM', 'BTC-GAME', 'BTC-FCT', 'BTC-PTOY', 'BTC-DCR', 'BTC-DOGE', 'BTC-BNT', 'BTC-XLM', 'BTC-PART',
    'BTC-MCO', 'BTC-UBQ', 'BTC-ARDR', 'BTC-KMD', 'BTC-ARK', 'BTC-ADX', 'BTC-SYS', 'BTC-ANT', 'BTC-MUE', 'BTC-XDN',
    'BTC-STORJ', 'BTC-QRL', 'BTC-NXS', 'BTC-GRS', 'BTC-VTC', 'BTC-CLOAK', 'BTC-SIB', 'BTC-REP', 'BTC-VIA', 'BTC-WINGS',
    'BTC-SWT', 'BTC-SLS', 'BTC-MONA', 'BTC-AMP', 'BTC-HMQ', 'BTC-TX', 'BTC-RLC', 'BTC-BLOCK', 'BTC-DYN', 'BTC-GUP',
    'BTC-MEME', 'BTC-OK', 'BTC-XZC', 'BTC-ADT', 'BTC-FTC', 'BTC-ION', 'BTC-BSD', 'BTC-GNO', 'BTC-EMC2', 'BTC-EXCL',
    'BTC-SPHR', 'BTC-EXP', 'BTC-BITB', 'BTC-BAY', 'BTC-VRC', 'BTC-BURST', 'BTC-SHIFT', 'BTC-BLK', 'BTC-ZEN', 'BTC-KORE',
    'BTC-RADS', 'BTC-IOP', 'BTC-NAV', 'BTC-ADA', 'BTC-MANA', 'BTC-SALT', 'BTC-SBD', 'BTC-TIX', 'BTC-RCN', 'BTC-VIB',
    'BTC-POWR', 'BTC-MER', 'BTC-ENG', 'BTC-UKG', 'BTC-DNT', 'BTC-IGNIS', 'BTC-SRN', 'BTC-WAX', 'BTC-ZRX', 'BTC-VEE',
    'BTC-BCPT', 'BTC-TRX', 'BTC-TUSD', 'BTC-LRC', 'BTC-RVR', 'BTC-UP', 'BTC-DMT', 'BTC-LUN', 'BTC-POLY', 'BTC-EMC',
    'BTC-PRO', 'BTC-BLT', 'BTC-STORM', 'BTC-AID', 'BTC-NGC', 'BTC-GTO', 'BTC-OCN', 'BTC-TUBE', 'BTC-CMCT', 'BTC-BCH',
    'BTC-BKX', 'BTC-MFT', 'BTC-LOOM', 'BTC-RFR', 'BTC-RVN', 'BTC-BFT', 'BTC-GO', 'BTC-UPP', 'BTC-ENJ', 'BTC-MET',
    'BTC-HYDRO', 'BTC-CRW', 'BTC-DTA', 'BTC-EDR', 'BTC-BOXX', 'BTC-IHT', 'BTC-XHV', 'BTC-MTL', 'BTC-PMA', 'BTC-PAL',
    'BTC-PAX', 'BTC-MOC', 'BTC-NPXS', 'BTC-ZIL', 'BTC-OST', 'BTC-MEDX', 'BTC-SPC', 'BTC-BSV', 'BTC-IOST', 'BTC-XNK',
    'BTC-NCASH', 'BTC-JNT', 'BTC-LBA', 'BTC-DENT', 'BTC-DRGN', 'BTC-BTM', 'BTC-ELF', 'BTC-BTT', 'BTC-VITE', 'BTC-IOTX',
    'BTC-BTU', 'BTC-SOLVE', 'BTC-NKN', 'BTC-QNT', 'BTC-CTXC', 'BTC-SPND', 'BTC-META' ];

  public UPBIT_ALL_ETH_MARKET_LIST = [
    'ETH-LTC', 'ETH-STRAT', 'ETH-XRP', 'ETH-ETC', 'ETH-OMG', 'ETH-CVC', 'ETH-DGB', 'ETH-PAY', 'ETH-SC', 'ETH-SNT',
    'ETH-DASH', 'ETH-WAVES', 'ETH-XEM', 'ETH-ZEC', 'ETH-XMR', 'ETH-QTUM', 'ETH-GNT', 'ETH-BAT', 'ETH-BNT', 'ETH-XLM',
    'ETH-MCO', 'ETH-ADX', 'ETH-ANT', 'ETH-REP', 'ETH-RLC', 'ETH-GNO', 'ETH-MANA', 'ETH-SALT', 'ETH-VIB', 'ETH-POWR',
    'ETH-SRN', 'ETH-WAX', 'ETH-ZRX', 'ETH-TRX', 'ETH-TUSD', 'ETH-ADA', 'ETH-ENG', 'ETH-UKG', 'ETH-DMT', 'ETH-POLY',
    'ETH-STORM', 'ETH-OCN', 'ETH-BCH'];

  public UPBIT_ALL_USDT_MARKET_LIST = [
    'USDT-BTC', 'USDT-ETH', 'USDT-LTC', 'USDT-XRP', 'USDT-ETC', 'USDT-DASH', 'USDT-ZEC', 'USDT-XMR', 'USDT-OMG',
    'USDT-XVG', 'USDT-ADA', 'USDT-NXT', 'USDT-TUSD', 'USDT-SC', 'USDT-TRX', 'USDT-DCR', 'USDT-BCH', 'USDT-DGB',
    'USDT-DOGE', 'USDT-ZRX', 'USDT-RVN', 'USDT-BAT', 'USDT-PAX' ];

  public UPBIT_ALL_MARKET_LIST = [
    'KRW-BTC', 'KRW-DASH', 'KRW-ETH', 'KRW-NEO', 'KRW-MTL', 'KRW-LTC', 'KRW-STRAT', 'KRW-XRP', 'KRW-ETC', 'KRW-OMG',
    'KRW-SNT', 'KRW-WAVES', 'KRW-PIVX', 'KRW-XEM', 'KRW-ZEC', 'KRW-XMR', 'KRW-QTUM', 'KRW-GNT', 'KRW-LSK', 'KRW-STEEM',
    'KRW-XLM', 'KRW-ARDR', 'KRW-KMD', 'KRW-ARK', 'KRW-STORJ', 'KRW-GRS', 'KRW-VTC', 'KRW-REP', 'KRW-EMC2', 'KRW-ADA',
    'KRW-SBD', 'KRW-TIX', 'KRW-POWR', 'KRW-MER', 'KRW-BTG', 'KRW-ICX', 'KRW-EOS', 'KRW-STORM', 'KRW-TRX', 'KRW-MCO',
    'KRW-SC', 'KRW-GTO', 'KRW-IGNIS', 'KRW-ONT', 'KRW-DCR', 'KRW-ZIL', 'KRW-POLY', 'KRW-ZRX', 'KRW-SRN', 'KRW-LOOM',
    'KRW-BCH', 'KRW-ADT', 'KRW-ADX', 'KRW-BAT', 'KRW-IOST', 'KRW-DMT', 'KRW-RFR', 'KRW-CVC', 'KRW-IQ', 'KRW-IOTA',
    'KRW-OST', 'KRW-MFT', 'KRW-ONG', 'KRW-GAS', 'KRW-MEDX', 'KRW-UPP', 'KRW-ELF', 'KRW-KNC', 'KRW-BSV', 'KRW-THETA',
    'KRW-WAX', 'KRW-EDR', 'KRW-QKC', 'KRW-CPT', 'KRW-BTT',

    'BTC-ETH', 'BTC-LTC', 'BTC-STRAT', 'BTC-XRP', 'BTC-ETC', 'BTC-OMG', 'BTC-CVC', 'BTC-DGB', 'BTC-PAY', 'BTC-SC',
    'BTC-SNT', 'BTC-DASH', 'BTC-XVG', 'BTC-WAVES', 'BTC-NMR', 'BTC-SYNX', 'BTC-PIVX', 'BTC-GBYTE', 'BTC-XEM', 'BTC-ZEC',
    'BTC-XMR', 'BTC-LBC', 'BTC-QTUM', 'BTC-GNT', 'BTC-NXT', 'BTC-BAT', 'BTC-XEL', 'BTC-EDG', 'BTC-LSK', 'BTC-RDD',
    'BTC-DCT', 'BTC-STEEM', 'BTC-GAME', 'BTC-FCT', 'BTC-PTOY', 'BTC-DCR', 'BTC-DOGE', 'BTC-BNT', 'BTC-XLM', 'BTC-PART',
    'BTC-MCO', 'BTC-UBQ', 'BTC-ARDR', 'BTC-KMD', 'BTC-ARK', 'BTC-ADX', 'BTC-SYS', 'BTC-ANT', 'BTC-MUE', 'BTC-XDN',
    'BTC-STORJ', 'BTC-QRL', 'BTC-NXS', 'BTC-GRS', 'BTC-VTC', 'BTC-CLOAK', 'BTC-SIB', 'BTC-REP', 'BTC-VIA', 'BTC-WINGS',
    'BTC-SWT', 'BTC-SLS', 'BTC-MONA', 'BTC-AMP', 'BTC-HMQ', 'BTC-TX', 'BTC-RLC', 'BTC-BLOCK', 'BTC-DYN', 'BTC-GUP',
    'BTC-MEME', 'BTC-OK', 'BTC-XZC', 'BTC-ADT', 'BTC-FTC', 'BTC-ION', 'BTC-BSD', 'BTC-GNO', 'BTC-EMC2', 'BTC-EXCL',
    'BTC-SPHR', 'BTC-EXP', 'BTC-BITB', 'BTC-BAY', 'BTC-VRC', 'BTC-BURST', 'BTC-SHIFT', 'BTC-BLK', 'BTC-ZEN', 'BTC-KORE',
    'BTC-RADS', 'BTC-IOP', 'BTC-NAV', 'BTC-ADA', 'BTC-MANA', 'BTC-SALT', 'BTC-SBD', 'BTC-TIX', 'BTC-RCN', 'BTC-VIB',
    'BTC-POWR', 'BTC-MER', 'BTC-ENG', 'BTC-UKG', 'BTC-DNT', 'BTC-IGNIS', 'BTC-SRN', 'BTC-WAX', 'BTC-ZRX', 'BTC-VEE',
    'BTC-BCPT', 'BTC-TRX', 'BTC-TUSD', 'BTC-LRC', 'BTC-RVR', 'BTC-UP', 'BTC-DMT', 'BTC-LUN', 'BTC-POLY', 'BTC-EMC',
    'BTC-PRO', 'BTC-BLT', 'BTC-STORM', 'BTC-AID', 'BTC-NGC', 'BTC-GTO', 'BTC-OCN', 'BTC-TUBE', 'BTC-CMCT', 'BTC-BCH',
    'BTC-BKX', 'BTC-MFT', 'BTC-LOOM', 'BTC-RFR', 'BTC-RVN', 'BTC-BFT', 'BTC-GO', 'BTC-UPP', 'BTC-ENJ', 'BTC-MET',
    'BTC-HYDRO', 'BTC-CRW', 'BTC-DTA', 'BTC-EDR', 'BTC-BOXX', 'BTC-IHT', 'BTC-XHV', 'BTC-MTL', 'BTC-PMA', 'BTC-PAL',
    'BTC-PAX', 'BTC-MOC', 'BTC-NPXS', 'BTC-ZIL', 'BTC-OST', 'BTC-MEDX', 'BTC-SPC', 'BTC-BSV', 'BTC-IOST', 'BTC-XNK',
    'BTC-NCASH', 'BTC-JNT', 'BTC-LBA', 'BTC-DENT', 'BTC-DRGN', 'BTC-BTM', 'BTC-ELF', 'BTC-BTT', 'BTC-VITE', 'BTC-IOTX',
    'BTC-BTU', 'BTC-SOLVE', 'BTC-NKN', 'BTC-QNT', 'BTC-CTXC', 'BTC-SPND', 'BTC-META',

    'ETH-LTC', 'ETH-STRAT', 'ETH-XRP', 'ETH-ETC', 'ETH-OMG', 'ETH-CVC', 'ETH-DGB', 'ETH-PAY', 'ETH-SC', 'ETH-SNT',
    'ETH-DASH', 'ETH-WAVES', 'ETH-XEM', 'ETH-ZEC', 'ETH-XMR', 'ETH-QTUM', 'ETH-GNT', 'ETH-BAT', 'ETH-BNT', 'ETH-XLM',
    'ETH-MCO', 'ETH-ADX', 'ETH-ANT', 'ETH-REP', 'ETH-RLC', 'ETH-GNO', 'ETH-MANA', 'ETH-SALT', 'ETH-VIB', 'ETH-POWR',
    'ETH-SRN', 'ETH-WAX', 'ETH-ZRX', 'ETH-TRX', 'ETH-TUSD', 'ETH-ADA', 'ETH-ENG', 'ETH-UKG', 'ETH-DMT', 'ETH-POLY',
    'ETH-STORM', 'ETH-OCN', 'ETH-BCH',

    'USDT-BTC', 'USDT-ETH', 'USDT-LTC', 'USDT-XRP', 'USDT-ETC', 'USDT-DASH', 'USDT-ZEC', 'USDT-XMR', 'USDT-OMG',
    'USDT-XVG', 'USDT-ADA', 'USDT-NXT', 'USDT-TUSD', 'USDT-SC', 'USDT-TRX', 'USDT-DCR', 'USDT-BCH', 'USDT-DGB',
    'USDT-DOGE', 'USDT-ZRX', 'USDT-RVN', 'USDT-BAT', 'USDT-PAX'
  ];
}

export const constant = new Constant;

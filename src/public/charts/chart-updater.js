class ChartUpdater {
  constructor(chart, opt) {
    this.chart = chart;
    this.opt = opt;

    let url = `${document.URL}`;
    url += `exchange/${this.opt.exchange}`;
    url += `/currency/${opt.currency}`;
    url += `/candles/${opt.candles}`;
    if (this.opt.candles === 'minutes') {
      url += `/${this.opt.candlesUnit}`
    }
    url += `?count=${this.opt.count}`;
    
    setTimeout( function () {
      const chart = this.chart;
      $.ajax({url,
        success: function (resp) {
          chart.clearRow();
          chart.addRows(resp.chart);
        }
      });
    }.bind(this), 500);
  }
}

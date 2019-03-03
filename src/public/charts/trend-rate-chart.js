
class TrendRateChartGoogle {

  constructor(divName, columns, options) {
    this.divName = divName;
    if (columns) {
      this.columns = columns;
    } else {
      this.columns = [
        { type: 'string', title: 'DateTime'},
        { type: 'number', title: 'BTC'},
        { type: 'number', title: 'ETH'},
        { type: 'number', title: 'XRP'},
        { type: 'number', title: 'EOS'},
        { type: 'number', title: 'TRX'},
        { type: 'number', title: 'XLM'},
        { type: 'number', title: 'ADA'},
        { type: 'number', title: 'BCH'},
        { type: 'number', title: 'LTC'},
        { type: 'number', title: 'ZEC'}
      ];
    }
    this.options = {
      chart: {
        title: 'Trend percentage chart',
        subtitle: ''
      },
      width: 900,
      height: 500,
      hAxis: { maxValue: 100 },
      vAxis: { maxValue: 100 },
      lineWidth: 2,
      // colors: ['#e2431e', '#d3362d', '#e7711b',
      //         '#e49307', '#e49307', '#b9c246'],
      axes: {
        x: {
          0: {side: 'bottom'}
        },
        y: {
          0: {side: 'left'}
        }
      },
      hAxis: {
        format: 'none',
        title: 'timeline'
        // ticks: [new Date(2014,3,15), new Date(2013,5,15)]
        // ticks: [0, 25, 50, 75, 100] // display labels every 25
      },
      vAxis: {
        format: 'percent'
        // viewWindow: {
        //     min: -2,
        //     max: 2
        // },
        // ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
      },
      legend: {
        position: 'right',
        textStyle: {
          fontSize: 10,
          bold: true
        }
      }
    };
    if (options) {
      this.options.chart = options.chart;
      this.options.width = options.width;
      this.options.height = options.height;
    }

    function drawTrendPercentageChart() {
      const data = new google.visualization.DataTable();
      this.columns.forEach(element => {
        data.addColumn(element.type, element.title);
      });

      data.addRows([]);
      const chart = new google.charts.Line(document.getElementById(`${divName}`));
      chart.draw(data, google.charts.Line.convertOptions(options));
      this.dataset = data;
      this.chart = chart;
    }

    google.charts.setOnLoadCallback(drawTrendPercentageChart.bind(this));

  }

  getOptions() {
    return this.options;
  }
  setOptions(options) {
    this.options = options;
  }

  getNumberOfRows() {
    return this.dataset.getNumberOfRows();
  }

  addRow(rowDataSet) {
    if (rowDataSet) {
      this.dataset.addRow(rowDataSet);
    }
    this.chart.draw(this.dataset, google.charts.Line.convertOptions(this.options));
  }

  addRows(rowDataSet) {
    if (rowDataSet) this.dataset.addRows(rowDataSet);
    this.chart.draw(this.dataset, google.charts.Line.convertOptions(this.options));
  }

  clearRow() {
    this.dataset.removeRows(0, this.dataset.getNumberOfRows());
    this.chart.draw(this.dataset, google.charts.Line.convertOptions(this.options));
  }

}

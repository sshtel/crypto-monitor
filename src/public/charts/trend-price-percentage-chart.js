


class TrendPricePercentageChart {
  
  constructor(divName, columns, options) {
    this.divName = divName;
    this.columns = columns;
    this.options = {
      chart: {
        title: 'Trend percentage chart',
        subtitle: ''
      },
      width: 900,
      height: 500,
      lineWidth: 2,
      // colors: ['#e2431e', '#d3362d', '#e7711b',
      //         '#e49307', '#e49307', '#b9c246'],
      series: {
        // Gives each series an axis name that matches the Y-axis below.
        0: {axis: 'Price'},
        1: {
          axis: 'Percentage'
        }
      },
      vAxes: {
        Price: {
          title: 'Price',
          viewWindowMode:'explicit',
          // viewWindow:{
          //   max:4300000,
          //   min:4000000
          // },
          format: 'decimal',
          gridlines: {color: 'transparent'},
        },
        Percentage: {
          title: '+-%',
          gridlines: {color: 'transparent'},
          format: 'percent',
          viewWindow:{
            max: 0.02,
            min: -0.02
          }
        },
      },
      hAxis: {
        format: 'none',
        title: 'timeline',
        viewWindow: {
            min: 0,
            max: 100
        }
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
      columns.forEach(element => {
        data.addColumn(element.type, element.title);
      });

      data.addRows([]);
      const chart = new google.charts.Line(document.getElementById(`${divName}`));
      
      // chart.draw(data, options);
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

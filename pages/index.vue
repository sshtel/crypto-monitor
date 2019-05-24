<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-card>
        <v-card-title class="headline">Upbit Dashboard</v-card-title>
        <v-card-text>        
        </v-card-text>
      </v-card>
      
      <p> </p>
      <h1> Upbit rate trend chart - 240 min tick, 2 weeks</h1>
      <GChart
      type="LineChart"
      :data     ="chartDataSquad0Min240"
      :options  ="chartOptsSquad0Min240"
      @ready    ="onChartReadySquad0Min240"
      />

      <p> </p>
      <h1> Upbit rate trend chart - 1 day tick, 200 days</h1>
      <GChart
      type="LineChart"
      :data     ="chartDataSquad0Days"
      :options  ="chartOptsSquad0Days"
      @ready="onChartReadySquad0Days"
      />

    </v-flex>


  </v-layout>

</template>


<script>

// import Vue from 'vue'
import { GChart } from 'vue-google-charts'

const optionsBase = {
        chart: {
          title: 'Trend percentage chart',
          subtitle: ''
        },
        textStyle: {
            color: '#01579b',
            fontSize: 20,
            fontName: 'Arial',
            bold: true,
            italic: true
        },
        titleTextStyle: {
            color: '#01579b',
            fontSize: 16,
            fontName: 'Arial',
            bold: false,
            italic: true
        },
        backgroundColor: { fill:'#AAAAAA' },
        // width: 900,
        height: 500,
        hAxis: { maxValue: 100 },
        vAxis: { maxValue: 100 },
        lineWidth: 1,
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
          // gridlineColor: "#FFFFFF",
          // baselineColor: '#FFFFFF'
          // ticks: [new Date(2014,3,15), new Date(2013,5,15)]
          // ticks: [0, 25, 50, 75, 100] // display labels every 25
        },
        vAxis: {
          format: 'percent',
          gridlineColor: "#000000"
          // baselineColor: '#FFFFFF'
          // textStyle:{ color: '#FFFFFFF' }
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

export default {
  components: {
    GChart
  },
  methods: {
    onChartReadySquad0Min240 (chart, google) {
      const protocol = `http://`;
      const hostname = `${location.host}`;
      const pathname = `/exchange/upbit/currency/krw/candles/minutes/240?count=100`;
      const url = `${protocol}${hostname}/api${pathname}`;
      fetch(url)
      .then( response => {
        response.json().then( resp => {
          let options = this.options;
          options.chart.title = 'Trend rate chart about 2 weeks - Squad 0'
          const newData = [];
          newData.push([ 'DateTime' ].concat(resp.column));
          resp.chart.forEach( value => {
            newData.push(value);
          });
          this.chartDataSquad0Min240 = newData;
          this.chartOptsSquad0Min240 = options;
        })
      });
    },
    onChartReadySquad0Days (chart, google) {
      const protocol = `http://`;
      const hostname = `${location.host}`;
      const pathname = `/exchange/upbit/currency/krw/candles/days?count=200`;
      const url = `${protocol}${hostname}/api${pathname}`;
      fetch(url)
      .then( response => {
        response.json().then( resp => {
          let options = this.options;
          options.chart.title = 'Trend rate chart about 2 weeks - Squad 0'
          const newData = [];
          newData.push([ 'DateTime' ].concat(resp.column));
          resp.chart.forEach( value => {
            newData.push(value);
          });
          this.chartDataSquad0Days = newData;
          this.chartOptsSquad0Days = options;
        })
      });
    }
  },
  data () {
    return {
      options: optionsBase,
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartDataSquad0Min240: [
        [ 'DateTime', 'BTC', 'ETH', 'XRP', 'EOS', 'TRX', 'XLM', 'ADA', 'BCH', 'LTC', 'ZEC' ],
        ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
      ],
      chartOptsSquad0Min240: optionsBase,
      chartDataSquad0Days: [
        [ 'DateTime', 'BTC', 'ETH', 'XRP', 'EOS', 'TRX', 'XLM', 'ADA', 'BCH', 'LTC', 'ZEC' ],
        ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
      ],
      chartOptsSquad0Days: optionsBase
    }
  }
}

</script>

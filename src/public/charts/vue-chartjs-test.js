
let chart = Vue.component('line-chart', {
  extends: VueChartJs.Line,
  mixins: VueChartJs.mixins,
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 39, 10, 40, 39, 80, 40]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
})


let chart2 = Vue.component('line-chart2', {
  extends: VueChartJs.Line,
  // mixins: [VueChartJs.mixins],
  data: () => ({
    datacollection: undefined,
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  mounted () {
    this.fillData();
    console.log(this.datacollection);
    
  },
  methods: {
    fillData: function () {
      this.datacollection = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Data Two',
            backgroundColor: '#183379',
            data: [
              this.getRandomInt (),
              this.getRandomInt (),
              this.getRandomInt (),
              this.getRandomInt (),
              this.getRandomInt (),
              this.getRandomInt (),
              this.getRandomInt () ]
          },
          {
            label: 'Data Two Clone',
            backgroundColor: '#A20319',
            data: [
              this.getRandomInt (),
              this.getRandomInt (),
              this.getRandomInt (),
              this.getRandomInt (),
              this.getRandomInt (),
              this.getRandomInt (),
              this.getRandomInt () ]
          }
        ]
      };

      this.renderChart(this.datacollection, this.options);
      this.htmlLegend = this.generateLegend()
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
  
})

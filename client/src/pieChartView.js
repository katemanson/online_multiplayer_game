var PieChart = function(params) {
  var container = document.getElementById('chart-div');

  var chart = new Highcharts.Chart({
    chart: {
      type: "pie",
      renderTo: container,
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.0f} %'
        }
      }
    },
    title: {
      text: params.title
    },
    series: [{name: params.seriesName, data: params.data}]
  });
};

  module.exports = PieChart;

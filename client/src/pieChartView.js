var PieChart = function(params) {
  var container = document.getElementById('chart-div');
  
  var chart = new Highcharts.Chart({
    chart: {
      type: "pie",
      renderTo: container
    },
    title: {
      text: params.title
    },
    series: [{name: params.seriesName, data: params.data}]
  });
};

module.exports = PieChart;

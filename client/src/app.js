var MapWrapper = require('./mapWrapper.js');
var countries = require('../../data/countries.js')

window.onload = function () {

  var worldMapDiv = document.getElementById('world-map');
  var mapOptions = {container: worldMapDiv, center: {lat: 51.5, lng: -0.127758}, zoom: 3};
  var mapWrapper = new MapWrapper(mapOptions);

  mapWrapper.addAllMarkers(countries);




};

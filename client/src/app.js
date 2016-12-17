var MapWrapper = require('./mapWrapper.js');
var countries = require('../../data/countries.js');
var Marker = require('./marker.js');

window.onload = function() {

  var worldMapDiv = document.getElementById('world-map');
  var mapOptions = {container: worldMapDiv, center: {lat: 51.5, lng: -0.127758}, zoom: 3};
  var mapWrapper = new MapWrapper(mapOptions);
  mapWrapper.getMarkersData();

  // mapWrapper.addAllMarkers(countries);

  var markerOptions = {
    position: {lat: 0, lng: 0},
    googleMap: mapWrapper.googleMap,
    color: "FF0ff0",
    label: "United Kingdom",
    returnValue: "GB",
    parentWrapper: mapWrapper
  };
  console.log(markerOptions);
  var testMarker = new Marker(markerOptions);

};

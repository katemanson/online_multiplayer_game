var MapWrapper = require('./mapWrapper.js');
var Marker = require('./marker.js');

window.onload = function() {

  var worldMapDiv = document.getElementById('world-map');
  var mapOptions = {container: worldMapDiv, center: {lat: 51.5, lng: -0.127758}, zoom: 3};
  var mapWrapper = new MapWrapper(mapOptions);

  mapWrapper.getMarkersData();

  var markerOptions = {
    position: {lat: 0, lng: 0},
    googleMap: mapWrapper.googleMap,
    color: "FF0ff0",
    label: "United Kingdom",
    returnValue: "GB",
    parentWrapper: mapWrapper
  };
  var testMarker = new Marker(markerOptions);

};

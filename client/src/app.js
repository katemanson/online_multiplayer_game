var MapWrapper = require('./mapWrapper.js');
var countries = require('../../data/countries.js');
// var Marker = require('./marker.js');

window.onload = function() {

  var worldMapDiv = document.getElementById('world-map');
  var mapOptions = {container: worldMapDiv, center: {lat: 51.5, lng: -0.127758}, zoom: 3};
  var mapWrapper = new MapWrapper(mapOptions);

  // mapWrapper.addAllMarkers(countries);

  // var markerOptions = {
  //   position: {lat: 0, lng: 0},
  //   googleMap: mapWrapper.googleMap,
  //   color: "FF0000",
  //   label: "GB"
  // };
  // console.log(markerOptions);
  // var testMarker = new Marker(markerOptions);

  var test = google.maps.Marker({
    position: {lat: 0, lng: 0},
    map: mapWrapper.googleMap
    // icon: new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + "FF0000")
  });
};

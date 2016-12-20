var MapWrapper = require('./mapWrapper.js');
var Marker = require('./marker.js');
var PlayerSetup = require('./playerSetup.js');
var LeaderBoard = require('./leaderBoard')

window.onload = function() {

  var worldMapDiv = document.getElementById('world-map');
  var mapOptions = {
    container: worldMapDiv,
    center: {lat: 30, lng: 0},
    zoom: 3,
    streetViewControl: false};
  var mapWrapper = new MapWrapper(mapOptions);
  mapWrapper.getMarkers();
  var leader = new LeaderBoard;

};

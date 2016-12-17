var MapWrapper = require('./mapWrapper.js');
var Marker = require('./marker.js');
var PlayerSetup = require('./playerSetup.js');

window.onload = function() {

  var worldMapDiv = document.getElementById('world-map');
  var mapOptions = {container: worldMapDiv, center: {lat: 51.5, lng: -0.127758}, zoom: 3};
  var mapWrapper = new MapWrapper(mapOptions);
  checkForPlayer();

  mapWrapper.getMarkersData();

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

var checkForPlayer = function(){
  var playerId = localStorage.getItem('playerId');
  if (playerId){
    return; // <--so nothing happens, currently; alternatively, do we want the id at this point?
  }
  else {
    document.getElementById('player-popup').style.display = "block"; 
  }
}

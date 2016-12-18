var MapWrapper = require('./mapWrapper.js');
var Marker = require('./marker.js');
var PlayerSetup = require('./playerSetup.js');

window.onload = function() {

  var worldMapDiv = document.getElementById('world-map');
  var mapOptions = {container: worldMapDiv, center: {lat: 51.5, lng: -0.127758}, zoom: 3};
  var mapWrapper = new MapWrapper(mapOptions);
  formPopUp();

  mapWrapper.getMarkersData();

};

var formPopUp = function(){
  var playerId = localStorage.getItem('playerId');
  if (playerId) {
    document.getElementById('player-popup').style.display = "block";
    document.getElementById('username-div').style.display = "none";
    return;
  } else {
    document.getElementById('player-popup').style.display = "block";
  }
};

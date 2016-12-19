var MapWrapper = require('./mapWrapper.js');
var Marker = require('./marker.js');
var PlayerSetup = require('./playerSetup.js');

window.onload = function() {

  var worldMapDiv = document.getElementById('world-map');
  var mapOptions = {container: worldMapDiv, center: {lat: 30, lng: 0}, zoom: 2};
  var mapWrapper = new MapWrapper(mapOptions);
  mapWrapper.getMarkers();

  var answerForm = document.getElementById('answer-form');
  answerForm.onsubmit = function(e){
    // e.preventDefault();

    // var playerName = document.getElementById('name-input').value;
    
    // if (!playerName){
    //   var url = "http://localhost:3000/players";
    //   var request = new XMLHttpRequest();
    //   request.open("POST", url);
    //   request.setRequestHeader("Content-Type", "application/json");
    //   request.onload = function(){
    //     if (request.status === 200){
    //     }
    //   };
    //   request.send(JSON.stringify(this));
    // },

    // var playerGuess = document.getElementById('answer-input').value;
    // console.log(playerName);
    // console.log(playerGuess);
    // console.log(e);


  }



};


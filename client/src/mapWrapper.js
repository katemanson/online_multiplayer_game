var Marker = require('./marker.js');

var MapWrapper = function(options){
  this.googleMap = new google.maps.Map(options.container, {
    center: options.center,
    zoom: options.zoom,
    streetViewControl: options.streetViewControl,
    styles: [
      {
        'featureType': 'administrative',
        'elementType': 'geometry.fill',
        'stylers': [
          {'visibility': 'off'}
        ]
      },
      {
        'featureType': 'administrative.country',
        'elementType': 'labels',
        'stylers': [
          {'visibility': 'off'}
        ]
      },
      {
        'featureType': 'administrative.land_parcel',
        'stylers': [
          {'visibility': 'off'}
        ]
      },
      {
        'featureType': 'administrative.locality',
        'stylers': [
          {'visibility': 'off'}
        ]
      },
      {
        'featureType': 'administrative.neighborhood',
        'stylers': [
          {'visibility': 'off'}
        ]
      },
      {
        'featureType': 'administrative.province',
        'stylers': [
          {'visibility': 'off'}
        ]
      },
      {
        'featureType': 'poi',
        'stylers': [
          {'visibility': 'off'}
        ]
      },
      {
        'featureType': 'road',
        'stylers': [
          {'visibility': 'off'}
        ]
      },
      {
        'featureType': 'transit',
        'stylers': [
          {'visibility': 'off'}
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'labels',
        'stylers':
        [
          {'visibility': 'off'}
        ]
      }
    ]
  }
);
this.markers = [];
var answerForm = document.getElementById('answer-form');
answerForm.onsubmit = this.handleAnswer();
};

MapWrapper.prototype = {
  addMarker: function(marker){
    this.markers.push(marker);
  },

  handleMarkerClick: function(returnValue){
    var playerId = localStorage.getItem('playerId');
    var answerForm = document.getElementById('answer-form');
    var alpha2CodeInput = document.getElementById('alpha2code-input');
    alpha2CodeInput.value = returnValue;
    var answerBox = document.getElementById('answer-box');
    answerBox.style.display = "block";
    if (playerId) {
      document.getElementById('username-div').style.display = "none";
    }
  },

  getMarkers: function(){
    var url = "http://localhost:3000/markers";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
      if (request.status === 200) {
        var jsonString = request.responseText;
        var responseObject = JSON.parse(jsonString);
        var markersData = responseObject.markersData;
        this.populateMarkers(markersData);
        console.log('response data', markersData)
      }
    }.bind(this);
    request.send();
  },

  populateMarkers: function(markersData){
    markersData.forEach( function(markerData){
      var markerOptions = {
        returnValue: markerData.alpha2Code,
        parentWrapper: this,
        googleMap: this.googleMap,
        position: markerData.position,
        color: markerData.color,
        label: markerData.label
      };
      var marker = new Marker(markerOptions);
      this.addMarker(marker);
    }.bind(this));
  },

  handleAnswer: function(){
    return function(event){
      event.preventDefault();
      var answerBox = document.getElementById('answer-box');
      answerBox.style.display = "none";
      var playerGuess = {
        playerId: window.localStorage.getItem('playerId'),
        playerName: event.target["0"].value,
        population: event.target["1"].value,
        alpha2Code: event.target["2"].value
      };

      var request = new XMLHttpRequest();
      var url = "http://localhost:3000/game";
      request.open("POST", url);
      request.setRequestHeader("Content-Type", "application/json");
      request.onload = function() {
        if(request.status === 200) {
          var responseObject = JSON.parse(request.responseText);
          this.populateMarkers(responseObject.markersData);
          window.localStorage.setItem('playerId', responseObject.clientPlayerId);
        }
      }.bind(this);
      request.send(JSON.stringify(playerGuess));
    }.bind(this);
  }



};

module.exports = MapWrapper;

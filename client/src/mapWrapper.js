var Marker = require('./marker.js');

var MapWrapper = function(options){
  this.googleMap = new google.maps.Map(options.container, {
    center: options.center,
    zoom: options.zoom,
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
  answerForm.onsubmit = this.handleAnswer(e);
};

MapWrapper.prototype = {
  addMarker: function(marker){
    this.markers.push(marker);
  },

  handleMarkerClick: function(returnValue){
    var playerId = localStorage.getItem('playerId');
    document.getElementById('answer-box').style.display = "block";
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
            var markersData = JSON.parse(jsonString);
            this.populateMarkers(markersData);
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

  handleAnswer: function(e){
    e.preventDefault();

  }


};

module.exports = MapWrapper;

var request = new XMLHttpRequest();
  request.open("POST", url);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if(request.status === 200) {
    }
  };
  request.send(JSON.stringify(account));
};

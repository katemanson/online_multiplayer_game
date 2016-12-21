var Marker = require('./marker.js');
var mapStyle = require('./map_style');
var PieChart = require('./PieChartView.js')

var MapWrapper = function(options){
  this.googleMap = new google.maps.Map(options.container, {
    center: options.center,
    zoom: options.zoom,
    streetViewControl: options.streetViewControl,
    styles: mapStyle
  }
  );
  this.markers = [];
  var answerForm = document.getElementById('answer-form');
  answerForm.onsubmit = this.handleAnswer();
  var zoomOutButton = document.querySelector('#zoom-out');
  zoomOutButton.onclick = this.zoomOut().bind(this);
  var chartButton = document.getElementById('pie-button');
  chartButton.onclick = this.displayPie();
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
      }
    }.bind(this);
    request.send();
  },

  populateMarkers: function(markersData){

    this.markers.forEach(function(marker){
      marker.googleMapMarker.setMap(null);
    });

    markersData.forEach( function(markerData){

      var markerOptions = {
        returnValue: markerData.alpha2Code,
        parentWrapper: this,
        googleMap: this.googleMap,
        position: markerData.position,
        color: markerData.color,
        label: "<p><b>" + markerData.countryName + "</p></b><p>" + markerData.labelStatus + "</p>"
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

          var country = responseObject.markersData.find(function(markerData){
            return markerData.alpha2Code === playerGuess.alpha2Code;
          });
          var countryName = country.countryName;
          //^has to be a better way of getting country name?

          var resultDiv = document.getElementById('result-div');
          resultDiv.style.display = "block";
          resultDiv.innerHTML = "<p>Good guess. </p><p>You've captured <b>" + countryName + "</b>.";
          resultDiv.className = "animation-start";
          setTimeout(function(){
            resultDiv.className = "animation-stop";
            resultDiv.style.display = "none";
          }, 2500);

          window.localStorage.setItem('playerId', responseObject.clientPlayerId);
        }
      }.bind(this);
      request.send(JSON.stringify(playerGuess));
    }.bind(this);
  },

  zoomOut: function(){
    return function(event){
    console.log("map", this.googleMap);
    this.googleMap.setZoom(2);
    }.bind(this);
  },

  displayPie: function(){
    return function(){
      var pieData = new Map();
      var url = "http://localhost:3000/markers";
      var request = new XMLHttpRequest();
      console.log("about to request");
      request.open("GET", url);
      request.onload = function () {
        console.log("got a response");
        if (request.status === 200) {
          var jsonString = request.responseText;
          var responseObject = JSON.parse(jsonString);
          console.log("reponse received");
          responseObject.markersData.forEach(function(countryData){
            // console.log(countryData);
            if (countryData.playerId){
              if (pieData.get(countryData.playerId) === undefined){
                currentValue = 0;
              } else {
                currentValue = pieData.get(countryData.playerId).y;
              };
              var newValue = currentValue + 1;
              console.log(currentValue, newValue);
              var sliceData = {y: newValue, color: countryData.color};
              // console.log("slice", sliceData);
              pieData.set(countryData.playerId, sliceData );
            };
          });

          var pieDataArray = [];
          for (key of pieData.keys()){
            pieDataArray.push({name: key, y: pieData.get(key).y, color: ("#" + pieData.get(key).color)});
          };
          console.log(pieDataArray);
          PieChart({
            title: "World Powers",
            seriesName: "Countries Held",
            data: pieDataArray
          });
          var pieChartDiv = document.getElementById('chart-div');
          pieChartDiv.style.display = "block";
        };

      };
      request.send();
    };

  }








};

module.exports = MapWrapper;

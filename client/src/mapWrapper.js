var MapWrapper = function(options){
  this.googleMap = new google.maps.Map(options.container, {
    center: options.center,
    zoom: options.zoom}
  );
  this.markers = [];
};

MapWrapper.prototype = {
  //
  addMarker: function(marker){
    this.markers.push(maker);
  },

  handleMarkerClick: function(returnValue){
    console.log(returnValue);
  },

  getMarkersData: function(){
    var url = "http://localhost:3000/markers";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
        if (request.status === 200) {
            var jsonString = request.responseText;
            var markersData = JSON.parse(jsonString);
            console.log(markersData);
            // this.populateMarkers(markersData);
        };
    };
    request.send();
  },

  populateMarkers: function(markersData){
    markersData.forEach( function(markerData){
      var markerOptions = {
        position: markerData.position,
        googleMap: this.googleMap,
        color: markerData.color,
        label: markerData.label,
        returnValue: markerData.returnValue,
        parentWrapper: this
      };
      var tempMarker = new Marker(markerOptions);
      this.addMarker(tempMarker);
    });
  }


}

module.exports = MapWrapper;

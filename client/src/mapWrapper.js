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

  getMarkers: function(){
    

  }
}

module.exports = MapWrapper;

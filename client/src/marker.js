var Marker = function(options){
  this.returnValue =  options.returnValue;
  this.initialize(options);
  this.googleMapMarker.addListener('click', this.markerClicked());
  this.googleMapMarker.addListener('mouseover', this.openInfoWindow());
  this.googleMapMarker.addListener('mouseout', this.closeInfoWindow());
  this.parentWrapper = options.parentWrapper;
};

Marker.prototype = {
  initialize: function(options){

    // this.googleMap = options.googleMap;
    this.googleMapMarker = new google.maps.Marker({
      position: options.position,
      map: options.googleMap,
      icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + options.color
    });
    this.infoWindow = new google.maps.InfoWindow({content: options.label});
  },

  openInfoWindow: function(){
    return function(){
      this.infoWindow.open(this.googleMap, this.googleMapMarker);
    }.bind(this);
  },

  closeInfoWindow: function(){
    return function(){
      this.infoWindow.close();
    }.bind(this);
  },

  markerClicked: function(){
    return function(){
      this.parentWrapper.handleMarkerClick(this.returnValue);
    }.bind(this);
  },

};

module.exports = Marker;

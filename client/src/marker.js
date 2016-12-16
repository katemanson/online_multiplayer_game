// options: position, googleMap, color, returnValue, label
var Marker = function(options){
  this.returnValue =  options.returnValue;
  this.initialize(options);
  this.addInfoWindow(options);
  this.googleMapMarker.addListener('click', this.markerClicked());
  this.parentWrapper = options.parentWrapper;
};

Marker.prototype = {
  initialize: function(options){

    this.googleMapMarker = new google.maps.Marker({
      position: options.position,
      map: options.googleMap,
      icon: new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + options.color)
    });
  },

  addInfoWindow: function(options) {
    var infoWindow = new google.maps.InfoWindow({content: options.label});
    infoWindow.open(options.googleMap, this.googleMapMarker);
  },

  markerClicked: function(){
    console.log("onlick setup");
    return function(){
      this.parentWrapper.handleMarkerClick(this.returnValue);
    }.bind(this);
  },

};


module.exports = Marker;

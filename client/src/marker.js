// options: position, googleMap, color, returnValue, label
var Marker = function(options){

  this.googleMapMarker = google.maps.Marker({
    position: options.position,
    map: options.googleMap,
    icon: new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + options.color)
  });

  var infoWindow = new google.maps.InfoWindow({content: options.label});
  infoWindow.open(options.googleMap, this.googleMapMarker);
  this.returnValue = options.returnValue;


};

Marker.prototype = {
};


module.exports = Marker;

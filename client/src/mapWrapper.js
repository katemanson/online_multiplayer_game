var MapWrapper = function(options){
  this.googleMap = new google.maps.Map(options.container, {
    center: options.center,
    zoom: options.zoom}
  );
  this.markers = [];
  var test = google.maps.Marker({
    position: {lat: 0, lng: 0},
    map: this.googleMap
    // icon: new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + "FF0000")
  });
};

MapWrapper.prototype = {
  //
  addMarker: function(marker){
    this.markers.push(maker);
  }

  //
  // addAllMarkers: function(countries){
  //   for (var country of countries){
  //     console.log('in for loop', country);
  //     var coords = {'lat': country.latlng[0], 'lng': country.latlng[1]};
  //     this.addMarker('ffffff', coords);
  //   }
  // }
}

module.exports = MapWrapper;

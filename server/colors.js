var Colors = function(){
  this.colors = [
    "880085",
    "D81E5B",
    "27CBCD",
    "FF9900",
    "FFCC00",
    "235789",
    "ED1C24",
    "85C7F2",
    "880085",
    "D81E5B",
    "27CBCD",
    "FF9900",
    "FFCC00",
    "235789",
    "ED1C24",
    "85C7F2"
  ];
};

Colors.prototype = {

  getNextColor: function(){
    return this.colors.pop();
  }
};

module.exports = Colors;

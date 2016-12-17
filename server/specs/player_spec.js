var Player = require('../player.js');
var assert = require('assert');

describe ('Player', function(){

  var testPlayer = new Player({
    name: "Andrina",
    colour: "#0000ff"
  });

  it('should have a name', function(){
    assert.equal("Andrina", testPlayer.name);
  });

  it('should have a colour', function(){
    assert.equal("#0000ff", testPlayer.colour);
  });

});
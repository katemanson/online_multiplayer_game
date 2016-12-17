var Player = require('../player.js');
var assert = require('assert');

describe ('Player', function(){

  var testPlayer = new Player({
    id: 1,
    name: "Andrina",
    colour: "#0000ff"
  });

  it('should have an id', function(){
    assert.equal(1, testPlayer.id);
  });

  it('should have a name', function(){
    assert.equal("Andrina", testPlayer.name);
  });

  it('should have a colour', function(){
    assert.equal("#0000ff", testPlayer.colour);
  });

});
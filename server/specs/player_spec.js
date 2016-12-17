var Player = require('../player.js');
var assert = require('assert');

describe ('Player', function(){

  var andrina = new Player({
    id: 1,
    name: "Andrina",
    colour: "#0000ff"
  });

  it('should have an id', function(){
    assert.equal(1, andrina.id);
  });

  it('should have a name', function(){
    assert.equal("Andrina", andrina.name);
  });

  it('should have a colour', function(){
    assert.equal("#0000ff", andrina.colour);
  });

});
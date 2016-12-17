var Game = require('../game');
var Player = require('../player');
var assert = require('assert');

describe ('Game', function(){

  var testGame = new Game({});

  var testPlayer = new Player({
    id: 1,
    name: "Andrina",
    colour: "#0000ff"
  });

  it('should start with empty players list', function(){
    assert.deepEqual([], testGame.players);
  });

  it('should be possible to add player', function(){
    testGame.addPlayer(testPlayer);
    assert.deepEqual(testPlayer, testGame.players[0]);
  });


});
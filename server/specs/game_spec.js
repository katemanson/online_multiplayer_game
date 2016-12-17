var Game = require('../game');
var Player = require('../player');
var assert = require('assert');

describe ('Game', function(){

  var testGame;
  var testPlayer;

  beforeEach(function(){
    testGame = new Game({});

    testPlayer = new Player({
      id: 1,
      name: "Andrina",
      colour: "#0000ff"
    });

  });

  it('should start with empty players list', function(){
    assert.deepEqual([], testGame.players);
  });

  it('should be possible to add player', function(done){
    testGame.addPlayerToDb(testPlayer);
    assert.equal("Andrina", testGame.players[testGame.players.length -1 ].name);
  });

  it('should be possible to get player from database', function(){
      testGame.getPlayersFromDb();
      assert.equal(1, testGame.players.length );
  });



});

var express = require('express');
var app = express();
var path = require('path');
var Game = require('./game.js');
var bodyParser = require('body-parser');

var game = new Game();

app.use(bodyParser.json());

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

app.get('/markers', function(req, res){
  game.sendClientSafeMarkersFromDb(false, "", res);
});

app.post('/game', function(req, res){
  //if req.body has playerName, need to add new player
  if ( !req.body.playerId ){
    game.addPlayer(req.body, res);
  } else {
    game.updateGameState(req.body, res);
  }
});

app.use(express.static(__dirname + '/../client/build'));

var server = app.listen(3000,'localhost', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Ready to take over the world...', host, port);

});

var express = require('express');
var app = express();
var path = require('path');
var Game = require('./game.js');
var bodyParser = require('body-parser');

var game = new Game();
game.getPlayersFromDb();
game.getGameStateFromDb();

app.use(bodyParser.json());

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

app.get('/markers', function(req, res){
  game.sendClientSafeMarkersFromDb(res, "");
});

app.post('/game', function(req, res){
  if ( req.body.playerId === null ){
    game.addPlayer(req.body.playerName, res);
  }
});

app.use(express.static(__dirname + '/../client/build'));

//CREATE
// app.post('/players', function(req,res) {
//   console.log('body', req.body);
//   var url = 'mongodb://localhost:27017/game';
//   //PLAYER NAME FROM req.body.playerName (I THINK)
//   //ASSIGN A COLOUR NOT ALREADY ASSIGNED
//   // MongoClient.connect(url, function(err, db) {
//   //   var players = db.collection('players');
//   //   players.insert(); <--INSERT NEW PLAYER OBJECT WITH NAME AND COLOUR
//   //GET BACK playerId FROM MONGO AND SAVE TO LOCAL STORAGE
//   //   res.status(200).end();
//   //   db.close();
//   // });
// });

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Ready to take over the world...', host, port);


});

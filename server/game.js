var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var MongoClient = require('mongodb').MongoClient;
var Player = require('./player.js');
var Colors = require('./colors.js');

var Game = function(){
  this.players = [];
  this.gameState = [];
  this.colors = new Colors();
  this.getPlayersFromDb();
  this.getGameStateFromDb();
};

Game.prototype = {

  addPlayer: function(playerGuess, res){
    var color = this.colors.getNextColor();
    var options = {name: playerGuess.playerName, color: color};
    var player = new Player(options);
    var url = 'mongodb://localhost:27017/game';
    MongoClient.connect(url, function(err, db){
      if(err){
        throw err;
      }
      var collection = db.collection('players');
      collection.insert(player, function(err, dbResponse){
        this.players.push(player);
        playerGuess.playerId = player._id;
        this.updateGameState(playerGuess, res);
        db.close();
      }.bind(this));
    }.bind(this));
  },

  isGuessBetter: function(playerGuess){
    var guessedCountry = this.gameState.find(function(state){
      return state.alpha2Code === playerGuess.alpha2Code;
    });
    var truePopulation = guessedCountry.population;
    var bestGuess = guessedCountry.bestGuess;
    var guessDistanceFromTrue = Math.abs(playerGuess.population - truePopulation);
    var bestDistanceFromTrue = Math.abs(bestGuess - truePopulation);
    if (guessDistanceFromTrue < bestDistanceFromTrue) {
      return true;
    } else {
      return false;
    }
  },

  updateGameState: function(playerGuess, res){

    if (this.isGuessBetter(playerGuess)){

      var player = this.players.find(function(player){
        var objectIdPlayerId = new ObjectID(playerGuess.playerId);
        return player._id.equals(objectIdPlayerId);
      });
      playerGuess.playerName = player.name;
      var url = 'mongodb://localhost:27017/game';
      MongoClient.connect(url, function(err, db){
        if(err){
          throw err;
        }
        var collection = db.collection('gameStates');
        collection.findOneAndUpdate(
        {
          alpha2Code: playerGuess.alpha2Code
        },
        {
          $set: {
            playerId: playerGuess.playerId,
            labelStatus: "<p>Held by <b>" + playerGuess.playerName + "</b></p>",
            color: player.color,
            bestGuess: playerGuess.population
          }
        },
        {
          returnOriginal: false
        },
        function(err, doc){
          if(err){
            throw err;
          };

          // could use getGameStateFromDb, but that is a whole new db query...
          this.gameState.forEach(function(element, index){
              if(element.alpha2Code === doc.value.alpha2Code){
                this.gameState[index] = doc.value;
              };
          }.bind(this));

          this.sendClientSafeMarkersFromDb(true, playerGuess.playerId, res);
          db.close();

        }.bind(this)
        );
      }.bind(this));
    }
    else {
      this.sendClientSafeMarkersFromDb(false, playerGuess.playerId, res);
    }
  },

  runDbQuery: function(projection, runMeWhenDone, database, dbCollection){

    var url = 'mongodb://localhost:27017/' + database;
    MongoClient.connect(url, function(err, db){
      if(err){
        throw err;
      }
      var collection = db.collection(dbCollection);
      collection.find({}, projection).toArray(function(err, docs){

        runMeWhenDone(docs);
        db.close();
      });
    });
  },

  getPlayersFromDb: function(){
    this.runDbQuery({},
      function(docs){
        this.players = docs;
      }.bind(this),
      'game',
      'players');
  },

  getGameStateFromDb: function(){
    this.runDbQuery({},
      function(docs){
        this.gameState = docs;
      }.bind(this),
      'game',
      'gameStates'
      );
  },

  sendClientSafeMarkersFromDb: function(bestGuessBoolean, clientPlayerId, res){
    var markersForClient = this.runDbQuery({
      _id: 0,
      position: 1,
      countryName: 1,
      alpha2Code: 1,
      playerId: 1,
      labelStatus: 1,
      color: 1
    },
    function(docs){
      var data = {
        bestGuess: bestGuessBoolean,
        clientPlayerId: clientPlayerId,
        markersData: docs
      }
      res.json(data);
    },
    'game',
    'gameStates'
    );
  }

};

module.exports = Game;

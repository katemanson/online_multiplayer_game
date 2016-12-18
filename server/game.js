var MongoClient = require('mongodb').MongoClient;

var Game = function(){
  this.players = [];
  this.gameState = [];

  this.getPlayersFromDb();
};

Game.prototype = {

  getPlayersFromDb: function(){

    var url = 'mongodb://localhost:27017/game';
    MongoClient.connect(url, function(err, db){
      if(err){
        throw err;
      };
      var collection = db.collection('players');
      collection.find().toArray(function(err, docs){
        this.players = docs;
        console.log(this.players);
        db.close();
      }.bind(this));
    }.bind(this));
  },

  addPlayerToDb: function(player){

    var url = 'mongodb://localhost:27017/game';
    MongoClient.connect(url, function(err, db){
      if(err){
        throw err;
      };
      var collection = db.collection('players');
      collection.insert(player);
      db.close();
    });
    this.getPlayersFromDb();
  },

  getGameStateFromDb: function(){

    var url = 'mongodb://localhost:27017/game';
    MongoClient.connect(url, function(err, db){
      if(err){
        throw err;
      };
      var collection = db.collection('gameStates');
      collection.find().toArray(function(err, docs){
        this.gameState = docs;
        console.log(this.gameState);
        db.close();
      }.bind(this));
    }.bind(this));
  }

  // sendMarkersToPlayer: function(){

  // }
};

module.exports = Game;

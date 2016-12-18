var MongoClient = require('mongodb').MongoClient;

var Game = function(){
  this.players = [];
  this.gameState = [];
  this.returnData = "";

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

  runDbQuery: function(projection, runMeWhenDone){

    var url = 'mongodb://localhost:27017/game';
    MongoClient.connect(url, function(err, db){
      if(err){
        throw err;
      };
      var collection = db.collection('gameStates');
      collection.find({}, projection).toArray(function(err, docs){

        runMeWhenDone(docs);
        // console.log(this.gameState);
        db.close();
      }.bind(this));
    }.bind(this));

  },

  requestClientMarkersFromDb: function(res){
    var markersForClient = this.runDbQuery({
      _id: 0,
      alpha2Code: 1,
      playerId: 1,
      markerLabel: 1,
      markerColor: 1
    },
    function(docs){res.json(docs)}
  );
  }

};

module.exports = Game;

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

  runDbQuery: function(projection, runMeWhenDone, database, dbCollection){

    var url = 'mongodb://localhost:27017/' + database;
    MongoClient.connect(url, function(err, db){
      if(err){
        throw err;
      };
      var collection = db.collection(dbCollection);
      collection.find({}, projection).toArray(function(err, docs){

        runMeWhenDone(docs);
        // console.log(this.gameState);
        db.close();
      }.bind(this));
    }.bind(this));

  },

  sendClientSafeMarkersFromDb: function(res){
    var markersForClient = this.runDbQuery({
      _id: 0,
      position: 1,
      returnValue: 1,
      playerId: 1,
      label: 1,
      color: 1
    },
    function(docs){
      res.json(docs)
    }, 
    'game',
    'gameStates'
  );
  }

};

module.exports = Game;

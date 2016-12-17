var MongoClient = require('mongodb').MongoClient;



var Game = function(options){
  this.players = [];
};

Game.prototype = {

  addPlayerToDb: function(player){

    var url = 'mongodb://localhost:27017/game';
    MongoClient.connect(url, function(err, db){
      // console.log(this);
      if(err){
        throw err;
      };
      var collection = db.collection('players');
      collection.insert(player);
      db.close();
    });
    this.getPlayersFromDb();
  },

  getPlayersFromDb: function(){
    var url = 'mongodb://localhost:27017/game';
    MongoClient.connect(url, function(err, db){
      // console.log(this);
      if(err){
        throw err;
      };
      var collection = db.collection('players');
      collection.find().toArray(function(err, docs){
        this.players = docs;
        console.log(this.players)
      }.bind(this));
      db.close();
      ;
    }.bind(this))
  }
};

module.exports = Game;

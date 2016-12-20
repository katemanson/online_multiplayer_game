const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var fileDataString;
var fileDataObject;

fs.readFile('./countryData.json', function(err, data) {
  if (err) {
    throw err;
  };
  fileDataString = data;
  fileDataObject = JSON.parse(fileDataString);

  var url = 'mongodb://localhost:27017/countries';
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw err;
    };
    db.dropDatabase(function(err){
      if (err) {
        throw err;
      };
      var collection = db.collection('data');
      fileDataObject.forEach(function(countryObject){
        collection.insert(countryObject);
      });
      db.close();
    });
  });

  var gameUrl = 'mongodb://localhost:27017/game';
  MongoClient.connect(gameUrl, function(err, db){
    if (err) {
      throw err;
    };
    db.dropDatabase(function(err){
      if (err) {
        throw err;
      };
      var gameStates = db.collection('gameStates');
      var gameState = [];

      fileDataObject.forEach(function(countryObject){
        var countryState = {
          position: {lat: countryObject.latlng[0], lng: countryObject.latlng[1]},
          countryName: countryObject.name,
          alpha2Code: countryObject.alpha2Code,
          playerId: "",
          label: "<p><b>" + countryObject.name + "</b></p><p>" + "Unconquered</p>",
          color: "ffffff",
          bestGuess: -1
        };
        gameState.push(countryState);
      });
      gameStates.insert(gameState);
      db.close();
    });
  })
});

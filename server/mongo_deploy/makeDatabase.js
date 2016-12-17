const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var fileDataString;
var fileDataObject;

fs.readFile('./countryData.json', function(err, data) {
  if (err) {
    throw err;
  }
  fileDataString = data;
  fileDataObject = JSON.parse(fileDataString);

  var url = 'mongodb://localhost:27017/countries';
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('data');
    fileDataObject.forEach(function(countryObject){
      collection.insert(countryObject);
    });
    db.close();
  });
});

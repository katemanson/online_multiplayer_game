const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var data = "";
var fileDataString;
var fileDataObject;


fs.readFile('./countryData.json', function(err, data) {
  if (err) {
    throw err;
  };
  fileDataString = data;
  fileDataObject = JSON.parse(fileDataString);
  console.log(fileDataObject);
})



// MongoClient.connect(url, function(err, db) {
//   var url = 'mongodb://localhost:27017/countries';
//    var collection = db.collection('data');
//
//    fileDa
//
//    collection.find().toArray(function(err, docs) {
//
//      db.close();
//    });
// }






// // data.forEach(function(countryDatum){
//   var countryDatumObject = JSON.parse(data[0]);
//   console.log(countryDatumObject);
//   db.data.insert(countryDatumObject);
// // });

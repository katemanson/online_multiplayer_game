var express = require('express');
var app = express();
var path = require('path');


app.get('/', function (req, res){
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

app.get('/markers', function(req, res){
  //output markers here
});

app.use(express.static(__dirname + '/../client/build'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Ready to take over the world...', host, port);
});

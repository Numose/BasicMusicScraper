var express = require('express');
var app = express();
var path = require('path');
var port = 8080;

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/client/index.html'));
});

app.listen(port, function () {
  console.log('Express.js listening on port', port);
});
const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const promise = require('bluebird');
const workers = require('./workers.js');
const port = 8080;

// // // middle-wares // // //
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// // // routes // // //
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/client/index.html'));
});

app.get('/scripts', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/js/scripts.min.js'));
});

app.get('/styles', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/css/styles.css'));
});

app.get('/scrape', function(req, res) {
  
  var sendTracks = function(arr) { res.json(arr); };

  workers.fetchHtml(req.query.url)
    .then(sendTracks);

});

app.post('/scrape', function(req, res) {
  
  const tracks = JSON.parse(req.body.tracks).filter(function(elem) {
    return elem.download === true;
  });
  
  workers.downloadTracks(tracks);
  
  res.status(200);
});

// // // init // // //
app.listen(port, function () {
  console.log('Express.js listening on port', port);
});
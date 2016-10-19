const express = require('express');
const app = express();
const path = require('path');
/////////////////// moving these to utilities
const fs = require('fs');
const request = require('request');
const asyncseries = require('async-series');
const bodyparser = require('body-parser');
const cheerio = require('cheerio');
/////////////////////////////////////////////
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
  const postedTracks = JSON.parse(req.body.tracks);
  const filteredTracks = postedTracks.filter(function(elem) {
    return elem.download === true;
  });
  var downloads = filteredTracks.map(function(elem) {
    return function(done) {
      request.get(elem.url)
        .pipe(fs.createWriteStream(__dirname + '/public/downloads/' + elem.title));
      done();
    };
  });
  asyncseries(downloads, function(err) {
    if (err) console.log('failed to download: ', err);
  });
  res.status(200);
});


// // // init // // //
app.listen(port, function () {
  console.log('Express.js listening on port', port);
});
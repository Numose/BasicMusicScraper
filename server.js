const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const request = require('request');
const port = 8080;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/client/index.html'));
});

app.get('/scripts', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/js/scripts.min.js'));
});

app.get('/styles', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/css/styles.css'));
});

// app.get('/downloads', function(req, res) {
// 	res.sendFile(path.join(__dirname + '/public/client/downloads.html'));
// });

app.listen(port, function () {
  console.log('Express.js listening on port', port);
});
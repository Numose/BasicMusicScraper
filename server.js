const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const request = require('request');
const asyncseries = require('async-series');
const bodyparser = require('body-parser');
const cheerio = require('cheerio');
const port = 8080;

// middle-wares

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// console.log('==============');
// console.log(elem);
// console.log('==============');

// routes

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

  // TODO: need to break this out into utils
  request.get(req.query.url, function(error, response, html) {
    if (!error) {

      var tracks = [];

      // TODO: remove temp data
      tracks = [
        {"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_01.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_01.mp3"},
        {"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_02.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_02.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_03.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_03.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_04.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_04.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_01.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_01.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_02.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_02.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_03.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_03.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_04.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_04.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_05.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_05.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_KarazhanGameMansHall_Walk_01.mp3","title":"MUS_71_KarazhanGameMansHall_Walk_01.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_KarazhanGameMansHall_Walk_02.mp3","title":"MUS_71_KarazhanGameMansHall_Walk_02.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_KarazhanGameMansHall_Walk_03.mp3","title":"MUS_71_KarazhanGameMansHall_Walk_03.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_KarazhanManaDevourer_Walk_02.mp3","title":"MUS_71_KarazhanManaDevourer_Walk_02.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_KarazhanManaDevourer_Walk_03.mp3","title":"MUS_71_KarazhanManaDevourer_Walk_03.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_KarazhanVizaduum_Intro.mp3","title":"MUS_71_KarazhanVizaduum_Intro.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Ironforge_06.mp3","title":"MUS_WinterVeil_CityWalk_Ironforge_06.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Org_01.mp3","title":"MUS_WinterVeil_CityWalk_Org_01.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Org_03.mp3","title":"MUS_WinterVeil_CityWalk_Org_03.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Org_04.mp3","title":"MUS_WinterVeil_CityWalk_Org_04.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Org_05.mp3","title":"MUS_WinterVeil_CityWalk_Org_05.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Org_06.mp3","title":"MUS_WinterVeil_CityWalk_Org_06.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Org_07.mp3","title":"MUS_WinterVeil_CityWalk_Org_07.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Org_10.mp3","title":"MUS_WinterVeil_CityWalk_Org_10.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_GreenchWalk_01_01.mp3","title":"MUS_WinterVeil_GreenchWalk_01_01.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_GreenchWalk_01_02.mp3","title":"MUS_WinterVeil_GreenchWalk_01_02.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_GreenchWalk_01_03.mp3","title":"MUS_WinterVeil_GreenchWalk_01_03.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_GreenchWalk_01_04.mp3","title":"MUS_WinterVeil_GreenchWalk_01_04.mp3"}
      ];
      
      // const $ = cheerio.load(html);

      // $('body').find('audio').each(function(idx, elem) {
      //   const title = elem.attribs.src.split('\/');
      //   tracks.push({
      //     url: elem.attribs.src,
      //     title: title[title.length - 1]
      //   });
      // });

      res.json(tracks);
    
    } else {
      console.log('Error when requesting html', error);
    }
  });
});

app.post('/scrape', function(req, res) {
  const postedTracks = [
    {"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_01.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_01.mp3"},
    {"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_02.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_02.mp3"},
    {"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_03.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_03.mp3"},
    {"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_04.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_04.mp3"},
    {"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_01.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_01.mp3"}
  ];
  var downloads = postedTracks.map(function(elem) {
    return function(done) {
      request.get(elem.url)
        .pipe(fs.createWriteStream(__dirname + '/public/downloads/' + elem.title));
      done();
    };
  });
  asyncseries(downloads, function(err) {
    if (err) console.log(err);
  });
  res.status(200);
});

// app.get('/downloads', function(req, res) {
// 	res.sendFile(path.join(__dirname + '/public/client/downloads.html'));
// });

app.listen(port, function () {
  console.log('Express.js listening on port', port);
});
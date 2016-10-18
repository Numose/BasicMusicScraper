const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const port = 8080;

// console.log('==============');
// console.log(elem);
// console.log('==============');

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

  request(req.query.url, function(error, response, html) {
    if (!error) {

      var tracks = [];

      // temp data
      tracks = [
        {"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_01.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_01.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_02.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_02.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_03.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_03.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_04.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_04.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_01.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_01.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_02.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_02.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_03.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_03.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_04.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_04.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_05.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_05.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_KarazhanGameMansHall_Walk_01.mp3","title":"MUS_71_KarazhanGameMansHall_Walk_01.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_KarazhanGameMansHall_Walk_02.mp3","title":"MUS_71_KarazhanGameMansHall_Walk_02.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_KarazhanGameMansHall_Walk_03.mp3","title":"MUS_71_KarazhanGameMansHall_Walk_03.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_KarazhanManaDevourer_Walk_02.mp3","title":"MUS_71_KarazhanManaDevourer_Walk_02.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_KarazhanManaDevourer_Walk_03.mp3","title":"MUS_71_KarazhanManaDevourer_Walk_03.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_KarazhanVizaduum_Intro.mp3","title":"MUS_71_KarazhanVizaduum_Intro.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Ironforge_06.mp3","title":"MUS_WinterVeil_CityWalk_Ironforge_06.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Org_01.mp3","title":"MUS_WinterVeil_CityWalk_Org_01.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Org_03.mp3","title":"MUS_WinterVeil_CityWalk_Org_03.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Org_04.mp3","title":"MUS_WinterVeil_CityWalk_Org_04.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Org_05.mp3","title":"MUS_WinterVeil_CityWalk_Org_05.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Org_06.mp3","title":"MUS_WinterVeil_CityWalk_Org_06.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Org_07.mp3","title":"MUS_WinterVeil_CityWalk_Org_07.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Org_10.mp3","title":"MUS_WinterVeil_CityWalk_Org_10.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_GreenchWalk_01_01.mp3","title":"MUS_WinterVeil_GreenchWalk_01_01.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_GreenchWalk_01_02.mp3","title":"MUS_WinterVeil_GreenchWalk_01_02.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_GreenchWalk_01_03.mp3","title":"MUS_WinterVeil_GreenchWalk_01_03.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_GreenchWalk_01_04.mp3","title":"MUS_WinterVeil_GreenchWalk_01_04.mp3"}
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

// app.get('/downloads', function(req, res) {
// 	res.sendFile(path.join(__dirname + '/public/client/downloads.html'));
// });

app.listen(port, function () {
  console.log('Express.js listening on port', port);
});
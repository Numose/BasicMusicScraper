const fs = require('fs');
const request = require('request');
const asyncseries = require('async-series');
const bodyparser = require('body-parser');
const cheerio = require('cheerio');

var workers = {};

workers.fetchHtml = function(url) {
  return new Promise(function(resolve, reject) {
    request.get(url, function(error, response, html) {
      if (!error) {
        
        var tracks = [];

        // // mock data
        // tracks = [
        //   {"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_01.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_01.mp3"},
        //   {"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_02.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_02.mp3"},
        //   {"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_03.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_03.mp3"},
        //   {"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_04.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_04.mp3"},
        //   {"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_01.mp3","title":"MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_01.mp3"}
        // ];

        const $ = cheerio.load(html);

        $('body').find('audio').each(function(idx, elem) {
          var title = elem.attribs.src.split('\/');
          title = title[title.length - 1];
          tracks.push({
            url: elem.attribs.src,
            title: title
          });
        });

        resolve(tracks);

      } else {
        reject(console.log('error fetching html: ', error));
      }
    });
  });
};

module.exports = workers;

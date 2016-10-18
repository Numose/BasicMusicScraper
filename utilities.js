const request = require('request');
const cheerio = require('cheerio');

const utilities = {

  getTracks: function(url) {
    request(url, function(error, response, html) {
      if (!error) {
        var tracks = [];

        // TODO: comment out temp data
        tracks = [
          {"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_01.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_02.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_03.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Guitar)_04.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_01.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_02.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_03.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_04.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_Event_DiabloAnniversary_TristramGuitar (Orchestra)_05.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_KarazhanGameMansHall_Walk_01.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_KarazhanGameMansHall_Walk_02.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_KarazhanGameMansHall_Walk_03.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_KarazhanManaDevourer_Walk_02.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_KarazhanManaDevourer_Walk_03.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_KarazhanVizaduum_Intro.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Ironforge_06.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Org_01.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Org_03.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Org_04.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Org_05.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Org_06.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Org_07.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_CityWalk_Org_10.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_GreenchWalk_01_01.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_GreenchWalk_01_02.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_GreenchWalk_01_03.mp3"},{"url":"http://media.mmo-champion.com/images/news/2016/september/music/MUS_WinterVeil_GreenchWalk_01_04.mp3"}
        ];

        var $ = cheerio.load(html);

        $('body').find('audio').each(function(idx, elem) {
          tracks.push({url: elem.attribs.src});
        });

        return tracks;
      
      } else {
        return error;
      }
    });
  }

};

module.exports = utilities;
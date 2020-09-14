var download  = require('node-image-downloader')
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

request('https://www.imdb.com/chart/moviemeter', function(err, res, body) {
  if (err) console.log('Erro: ' + err);

  var $ = cheerio.load(body);

  $('.lister-list tr').each(function () {
    var title  = $(this).find('.titleColumn a').text().trim();
    var rating = $(this).find('.imdbRating strong').text().trim();
    var imagesrc = $(this).find('.posterColumn img').attr('src');

      download({
          imgs: [
              {
                  uri:imagesrc
              }
          ],
          dest:'./img'
      })

    console.log('Titulo: ' + title);

    var fs = require('fs');

    fs.appendFile('imdb.txt', title + ' ' + rating + ' ' + imagesrc +  '\n', function (err) {
      if (err) throw err;
      
    });
    
  });
  console.log('Arquivo salvo com sucesso!');
});

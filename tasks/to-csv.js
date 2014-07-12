var fs = require('fs')
  , _ = require('lodash')
  , htmlToText = require('html-to-text')
  , stringify = require('csv-stringify');

function sanitize(t){
  // <br> tags are organized in a way that can be converted into a
  // comma separated list. Strip HTML then convert newlines.
  var result = htmlToText.fromString(t).replace('\n', ' ');
  result = result.replace(/\n/g, ', ');

  // get rid of quotes.
  result = result.replace(/["']/g, '');

  return result;
}

fs.readFile('bicycle_parking.geojson', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
   
  var dta = _.map(JSON.parse(data).features, function(i){
    var p = i.properties
      , coords = i.geometry.coordinates;

    var rowstr = [p.name, sanitize(p.description), p.type, p.capacity, coords[1], coords[0]];

      return rowstr;
  })
    , header = ['name','description','type','capacity','latitude','longitude'];

  stringify([header].concat(dta), function(err, d){
    fs.writeFile('bicycle_parking.csv', d, function (err) {
    if (err) return console.log(err);
      console.log('The file has now been written to bicycle_parking.csv');
    });
  });
});

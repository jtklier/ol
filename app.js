var fs = require('fs');
var csv = require('csv');

var MAXLIMIT = 50;
var limitCount = 0;
var page = 40;

var parser = csv.parse({delimiter: ',', columns: true });
parser.on('readable', function(){
  while((record = parser.read()) && limitCount<MAXLIMIT){
    if(parser.count > page*MAXLIMIT){
      console.log(record);
      limitCount++;
    }
  }
});

fs.createReadStream('data/50k_businesses.csv').pipe(parser);

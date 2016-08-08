var express = require('express');
var app = express();
var fs = require('fs');
var csv = require('csv');

var output;

app.get('/businesses', function( req, res ){
  var rs = fs.createReadStream('data/50k_businesses.csv');
    page = req.query.page || 0;
    var MAXLIMIT = 50;
    var offset = page*MAXLIMIT;
    output = {'page': page, businesses: []};

    var parser = csv.parse({delimiter: ',', columns: true }, function(err, data){
      if(err) output.errMsg = err;
      else{
          for(var i=0; i<MAXLIMIT; i++){
            output.businesses.push(data[i+offset]);
          }
          res.end(JSON.stringify(output));
    }
    });
    rs.pipe(parser);
});


app.get('/businesses/:id', function( req, res){
  var rs = fs.createReadStream('data/50k_businesses.csv');
  var index = parseInt(req.params.id);
  var parser = csv.parse({delimiter: ',', columns: true }, function(err, data){
    if(err)
      output.errMsg = err;
    else
      output = data[index];
    res.end(JSON.stringify(output));
  });
  rs.pipe(parser);
});

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Now listening at "+host+":"+port);
});

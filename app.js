var express = require('express');
var app = express();
var fs = require('fs');
var csv = require('csv');

var output;

app.get('/businesses', function( req, res ){
  var rs = fs.createReadStream('data/50k_businesses.csv');
    var page = req.query.page || 1;
    var MAXLIMIT = req.query.recordsPerPage || 50;
    var offset = (page-1)*MAXLIMIT;
    output = {'page': page, businesses: []};
    res.type('json');

    //TODO add error handling here for invalid requests


    var parser = csv.parse({delimiter: ',', columns: true });

    parser.on('readable', function(){
      while(record = parser.read()){
        if(output.businesses.length == MAXLIMIT){
          rs.destroy();
          res.status(200).end(JSON.stringify(output));
        }
        else if(parser.count > offset)
          output.businesses.push(record);
      }
    });

    parser.on('error', function(err){
      res.status(500).render('error', { message: err });
    })
    rs.pipe(parser);
});


app.get('/businesses/:id', function( req, res){
  var rs = fs.createReadStream('data/50k_businesses.csv');
  var index =req.params.id;
  output = {};
  res.type('json');
  var parser = csv.parse({delimiter: ',', columns: true });

  parser.on('readable', function(){
    while(record = parser.read()){
      if(index === record.id){
        output = record;
        rs.destroy();
        res.status(200).end(JSON.stringify(output));
      }
    }
  });

  parser.on('error', function(err){
    res.status(500).render('error', { message: err });
  })
  rs.pipe(parser);
});

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Now listening at "+host+":"+port);
});

var express = require('express');
var app = express();
var fs = require('fs');
var csv = require('csv');

const DATASOURCE = 'data/50k_businesses.csv';
var totalNumRecords;
var output;

app.get('/businesses', function( req, res ){
  var rs = fs.createReadStream(DATASOURCE);
    var page = req.query.page || 1;
    var recordsPerPage = req.query.recordsPerPage || 50;
    var offset = (page-1)*recordsPerPage;
    output = {'page': page, businesses: []};
    res.type('json');
    //TODO add error handling here for invalid requests
    if(isNaN(page) || parseInt(page) < 1){
      output.message = 'Invalid parameter - Please input a positive integer for the page.';
      res.status(400).end(JSON.stringify(output));
    }
    else if((page*recordsPerPage) > totalNumRecords){
      output.message = 'Parameter out of bounds - The requested page is out of bounds of the dataset.';
      res.status(400).end(JSON.stringify(output));
    }
    else{
      var parser = csv.parse({delimiter: ',', columns: true });

      parser.on('readable', function(){
        while(record = parser.read()){
          if(output.businesses.length == recordsPerPage){
            rs.destroy();
            res.status(200).end(JSON.stringify(output));
          }
          else if(parser.count == totalNumRecords){
            output.businesses.push(record);
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
    }
});


app.get('/businesses/:id', function( req, res){
  var rs = fs.createReadStream(DATASOURCE);
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
      else if(parser.count >= totalNumRecords){
        output.message = 'Not found - The requested id was not found: ' + index;
        res.status(404).end(JSON.stringify(output));
      }
    }
  });

  parser.on('error', function(err){
    res.status(500).render('error', { message: err });
  })
  rs.pipe(parser);
});

function setTotalNumRecords(cb) {
  var rs = fs.createReadStream(DATASOURCE);
  var parser = csv.parse({delimiter: ',', columns: true }, function(err, data){
    totalNumRecords = data.length;
    cb();
  });
  rs.pipe(parser);
}

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;
  setTotalNumRecords(function() {console.log("Now listening at "+host+":"+port);});
});

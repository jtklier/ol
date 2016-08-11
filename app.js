var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
require('./Businesses');
var Business = mongoose.model('Business');

mongoose.connect(config.dbUrl);

var totalNumRecords;
var output;


app.get('/businesses', function( req, res ){
    var page = req.query.page || 1;
    var recordsPerPage = req.query.recordsPerPage || 50;
    var offset = (page-1)*recordsPerPage;
    output = {'page': page, 'businesses': []};
    res.type('json');
    //TODO add error handling here for invalid requests
    if(isNaN(page) || parseInt(page) < 1){
      output.message = 'Invalid parameter - Please input a positive integer for the page.';
      res.status(400).end(JSON.stringify(output));
    }
    else if(isNaN(recordsPerPage) || parseInt(recordsPerPage) < 1){
      output.message = 'Invalid parameter - Please input a positive integer for the recordsPerPage.';
      res.status(400).end(JSON.stringify(output));
    }
    else if((page*recordsPerPage) > totalNumRecords){
      output.message = 'Parameter out of bounds - The requested page is out of bounds of the dataset.';
      res.status(400).end(JSON.stringify(output));
    }
    else{
      recordsPerPage = parseInt(recordsPerPage);
      Business.find().limit(recordsPerPage).skip(offset).sort({id: 'asc'}).exec(function(err, data){
        if(err){
          output.message = err;
          res.status(400);
        }
        output.businesses = data;
        res.json(output);
      });
    }
});


app.get('/businesses/:id', function( req, res){
  var requestedId = req.params.id;
  output = {};
  res.type('json');

  Business.where({ id: requestedId }).findOne(function (err,record){
    if(err){
      output.message = err;
      res.status(400);
    }
    else if(record){
      output = record;
    }
    else {
      output.message = 'Not found - The requested id was not found: ' + requestedId;
      res.status(404);
    }

    res.json(output);
  });
});

function setTotalNumRecords(cb) {
  Business.count({}, function(err, count){ cb(count);});
}

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;
  setTotalNumRecords(function(count) {
    totalNumRecords = count;
    console.log("Now listening at "+host+":"+port);
  });
});

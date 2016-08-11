var config = require('../config');
var frisby = require('frisby');

frisby.create('Get businesses with negative value for page')
  .get('http://'+config.serverAddress+':'+config.serverPort+config.businessesURI+'?page=-123')
  .expectStatus(400)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSONTypes({
    page: Number,
    records_per_page: Number,
    businesses: Array,
    message: String
  })
  .expectJSON({
    page: -123,
    records_per_page: 50,
    businesses: [],
    message: "Invalid parameter - Please input a positive integer for the page."
  })
  .expectJSONLength('businesses', 0)
  .toss();

frisby.create('Get businesses with non-positive value for records_per_page')
  .get('http://'+config.serverAddress+':'+config.serverPort+config.businessesURI+'?page=78&records_per_page=0')
  .expectStatus(400)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSONTypes({
    page: Number,
    records_per_page: Number,
    businesses: Array,
    message: String
  })
  .expectJSON({
    page: 78,
    records_per_page: 0,
    businesses: [],
    message: "Invalid parameter - Please input a positive integer for the records_per_page."
  })
  .expectJSONLength('businesses', 0)
  .toss();

frisby.create('Get businesses with alphanumeric value for page')
  .get('http://'+config.serverAddress+':'+config.serverPort+config.businessesURI+'?page=6asd12f4')
  .expectStatus(400)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSONTypes({
    page: String,
    records_per_page: Number,
    businesses: Array,
    message: String
  })
  .expectJSON({
    page: "6asd12f4",
    records_per_page: 50,
    businesses: [],
    message: "Invalid parameter - Please input a positive integer for the page."
  })
  .expectJSONLength('businesses', 0)
  .toss();

frisby.create('Get businesses with alphanumeric value for records_per_page')
  .get('http://'+config.serverAddress+':'+config.serverPort+config.businessesURI+'?page=312&records_per_page=vadsf435')
  .expectStatus(400)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSONTypes({
    page: Number,
    records_per_page: String,
    businesses: Array,
    message: String
  })
  .expectJSON({
    page: 312,
    records_per_page: "vadsf435",
    businesses: [],
    message: "Invalid parameter - Please input a positive integer for the records_per_page."
  })
  .expectJSONLength('businesses', 0)
  .toss();

frisby.create('Get businesses with page value out of bounds for the dataset')
  .get('http://'+config.serverAddress+':'+config.serverPort+config.businessesURI+'?page=12346')
  .expectStatus(400)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSONTypes({
    page: Number,
    records_per_page: Number,
    businesses: Array,
    message: String
  })
  .expectJSON({
    page: 12346,
    records_per_page: 50,
    businesses: [],
    message: "Parameter out of bounds - The requested page is out of bounds of the dataset."
  })
  .expectJSONLength('businesses', 0)
  .toss();

frisby.create('Get business with ID that doesnt exist')
  .get('http://'+config.serverAddress+':'+config.serverPort+config.businessesURI+'/50240')
  .expectStatus(404)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSONTypes({
    message: String
  })
  .expectJSON({
    message: "Not found - The requested id was not found: 50240"
  })
  .toss();

frisby.create('Get business with alphanumeric ID value')
  .get('http://'+config.serverAddress+':'+config.serverPort+config.businessesURI+'/sf23rf1')
  .expectStatus(400)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSONTypes('message', {
    message: String,
    name: String,
    kind: String,
    value: String,
    path: String
  })
  .expectJSON('message', {
    message: "Cast to number failed for value \"sf23rf1\" at path \"id\"",
    name: "CastError",
    kind: "number",
    value: "sf23rf1",
    path: "id"
  })
  .toss();

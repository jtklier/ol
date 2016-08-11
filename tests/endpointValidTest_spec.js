var config = require('../config');
var frisby = require('frisby');

frisby.create('Get businesses no parameters')
  .get('http://'+config.serverAddress+':'+config.serverPort+config.businessesURI)
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSONTypes({
    page: Number,
    records_per_page: Number
  })
  .expectJSONTypes('businesses.*', {
    id: Number,
    uuid: String,
    name: String,
    address: String,
    address2: String,
    city: String,
    state: String,
    zip: Number,
    country: String,
    phone: Number,
    website: String,
    created_at: String
  })
  .expectJSON({
    page: 1,
    records_per_page: 50
  })
  .expectJSON('businesses.?', {
        id: 0,
        uuid: "2859d6e0-1cb9-4fe9-bc00-97823a9fa4cb",
        name: "Yundt-Flatley",
        address: "1386 Lim Brooks",
        address2: "Suite 517",
        city: "Lake Betsy",
        state: "IA",
        zip: 19416,
        country: "US",
        phone: 4034880719,
        website: "http://www.halvorson.com/",
        created_at: "12/10/2012 16:17"
    })
    .expectJSONLength('businesses', 50)
    .toss();

frisby.create('Get businesses with page=5')
  .get('http://'+config.serverAddress+':'+config.serverPort+config.businessesURI+'?page=5')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    page: 5,
    records_per_page: 50
  })
  .expectJSON('businesses.49', {
    id: 249,
    uuid: "dee7fb4e-9cd4-4481-aefc-7534252d09ab",
    name: "Daniel-Larson",
    address: "6438 Leuschke Cliffs Apt. 587",
    address2: "Suite 596",
    city: "Coltonland",
    state: "IL",
    zip: 15489,
    country: "US",
    phone: 2772357079,
    website: "http://stokes.com/",
    created_at: "7/20/2015 23:11"
  })
  .expectJSONLength('businesses', 50)
  .toss();

frisby.create('Get businesses with page=100 and records_per_page=30')
  .get('http://'+config.serverAddress+':'+config.serverPort+config.businessesURI+'?page=100&records_per_page=30')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    page: 100,
    records_per_page: 30
  })
  .expectJSON('businesses.?', {
    id: 2980,
    uuid: "14621599-ae34-48f8-88aa-b9462a6707e0",
    name: "Kovacek Group",
    address: "42158 Mitchell Center",
    address2: "",
    city: "Konopelskiview",
    state: "PA",
    zip: 51597,
    country: "US",
    phone: 1838163645,
    website: "http://robel.org/",
    created_at: "4/16/2013 4:18"
  })
  .expectJSONLength('businesses', 30)
  .toss();

  frisby.create('Get business with id=1234')
    .get('http://'+config.serverAddress+':'+config.serverPort+config.businessesURI+'/1234')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
      id: 1234,
      uuid: "8e04a9a6-3a19-4ab6-85a7-fddec3a84fa4",
      name: "Hartmann Ltd",
      address: "82975 Angel Walk Suite 064",
      address2: "",
      city: "North Alexandrea",
      state: "NM",
      zip: 14190,
      country: "US",
      phone: 608328354,
      website: "http://will.com/",
      created_at: "12/4/2012 18:25"
    })
    .expectJSONTypes({
      id: Number,
      uuid: String,
      name: String,
      address: String,
      address2: String,
      city: String,
      state: String,
      zip: Number,
      country: String,
      phone: Number,
      website: String,
      created_at: String
    })
    .toss();

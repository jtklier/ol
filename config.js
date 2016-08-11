var config = {};

config.serverAddress = 'localhost';
config.serverPort = 8081;
config.businessesURI = '/businesses';
config.dbName = 'oldb';
config.dbUrl = 'mongodb://localhost/'+config.dbName;

module.exports = config;

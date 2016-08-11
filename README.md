# ol
REST API project

DISCLAIMER: This project includes software with the following licenses: BSD, Creative Commons Attributions-ShareAlike 3.0 United States, MIT, AGPL v3.0, Apache v2.0.

Project setup:

Download & setup mongoDB locally: https://www.mongodb.com/download-center#community

If you need help setting this up, the following post is useful: https://docs.mongodb.com/manual/administration/install-community/

from terminal/command line issue the following command to import data from the csv file: mongoimport -d <database name> -c <collection name> --type csv --file <csv file location> --headerline

In my case, I set the db name as a variable under config.js as config.dbName to 'oldb' and the collection name to 'businesses'.


Download & install node.js: https://nodejs.org/en/download/
To ensure node is installed, from command line/terminal run: 'node -v'
Additionally, make sure npm is installed (default with node) : 'npm -v'

In terminal/command line, navigate to the root of this project and run: 'npm install'

To start the server, run: 'node app.js'

The endpoints should now be up and running!

By default, the server address & port port set to 'localhost' & 8081, respectively, but these can be changed to your liking in the config.js file

endpoints: http://localhost:8081/businesses
           http://localhost:8081/businesses/{id}

Additionally, you can pass in query parameters to the first endpoint for 'page' and 'records_per_page'

ex: http://localhost:8081/businesses?page=5&records_per_page=10

To run the automated test suite, from the project root, run: 'jasmine-node tests'

Enjoy!

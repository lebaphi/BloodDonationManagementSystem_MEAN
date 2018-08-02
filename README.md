# BloodDonationManagementSystem
Implement the Blood Donation Management System by AngularJS/NodeJS/MongoDB, CrossOverTest

## Installation

1. Unzip
2. Set up server port in `package.json`
3. Set up MongoDB connection url in `package.json`
4. Run `npm install`
5. Download and install/extract mongodb at https://www.mongodb.com/download-center?jmp=nav#community
6. Create an empty folder say: MongoDB, open another command prompt then run command: mongod --port 27017 --dbpath <path_to_MongoDB_folder>
7. Run `npm start` on the root directory of source code folder to start web app

## Dependencies

  "dependencies": {
    "angular": "~1.5.0",
    "angular-resource": "~1.5.0",
    "angular-route": "~1.5.0",
    "angular-ui-bootstrap": "^2.5.0",
    "body-parser": "^1.14.2",
    "bootstrap": "^3.3.6",
    "express": "^4.13.4",
    "jquery": "^3.0.0",
    "mongodb": "^2.1.6",
    "socket.io": "^1.4.5"
  },
  "devDependencies": {
    "node-rest-client": "^3.1.0",
    "nodemon": "^1.8.1"
  }


## You need to request a google map api key:

To use the Google Maps JavaScript API, you must register your app project on the Google API Console and get a Google API key which you can add to your app.
Follow these steps to get an API key:

- Go to the Google API Console. (https://console.developers.google.com/flows/enableapi?apiid=maps_backend,geocoding_backend,directions_backend,distance_matrix_backend,elevation_backend,places_backend&reusekey=true)
- Create or select a project.
- Click Continue to enable the API and any related services.
- On the Credentials page, get an API key.
- Note: If you have an existing unrestricted API key, or a key with browser restrictions, you may use that key.
- From the dialog displaying the API key, select Restrict key to set a browser restriction on the API key.
- In the Key restriction section, select HTTP referrers (web sites), then follow the on-screen instructions to set referrers.
- (Optional) Enable billing. See Usage Limits for more information.

More details at https://developers.google.com/maps/documentation/javascript/get-api-key

## RUNNING

Access the http://localhost:3000

## TESTING

I'm using jasmine-node and node-rest-client to test the rest api. Follow these steps to test:
- Install jasmine-node global : npm install jasmine-node -g
- Run ` jasmine-node server/Test/spec/ `



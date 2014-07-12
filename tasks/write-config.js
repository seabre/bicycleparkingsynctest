var fs = require('fs');

var config = {
  domain: process.env.DOMAIN,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  appToken: process.env.APPTOKEN,
};

var job = {
  "datasetID": "mzz8-ifku",
  "fileToPublish": "bicycle_parking.csv",
  "publishMethod": "replace",
  "fileToPublishHasHeaderRow": true,
  "pathToFTPControlFile": "control.json",
  "publishViaFTP": true,
  "pathToSavedFile": "bicycle_parking.sij",
  "jobFilename": "bicycle_parking.sij",
  "fileVersionUID": 3
};

var control = {
  "action" : "Replace", 
  "csv" :
    {
      "useSocrataGeocoding": false,
      "columns": ['name', 'description', 'type', 'capacity', 'latitude', 'longitude'],
      "skip": 0,
      "fixedTimestampFormat": ["ISO8601","MM/dd/yy","MM/dd/yyyy","dd-MMM-yyyy"],
      "floatingTimestampFormat": ["ISO8601","MM/dd/yy","MM/dd/yyyy","dd-MMM-yyyy"],
      "timezone": "UTC",
      "separator": ",",
      "quote": "\"",
      "encoding": "utf-8",
      "emptyTextIsNull": true,
      "trimWhitespace": true,
      "trimServerWhitespace": true,
      "syntheticLocations": {
        "location_1": {
          "latitude": "latitude",
          "longitude": "longitude"
        }
      },
      "overrides": {}
    }
};

fs.writeFile('config.json', JSON.stringify(config), function(err) {
  if(err) {
    console.log('Failed to write config.json.');
  } else {
    console.log("config.json written!");
  }
}); 

fs.writeFile('bicycle_parking.sij', JSON.stringify(job), function(err) {
  if(err) {
    console.log(err);
    console.log('Failed to write bicycle_parking.sij.');
  } else {
    console.log("bicycle_parking.sij written!");
  }
});

fs.writeFile('control.json', JSON.stringify(control), function(err) {
  if(err) {
    console.log('Failed to write control.json.');
  } else {
    console.log("control.json written!");
  }
}); 

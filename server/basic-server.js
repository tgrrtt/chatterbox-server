var express = require('express');
var Firebase = require('firebase');
var path = require("path");
var app = express();

var myRootRef = new Firebase('https://blinding-torch-85.firebaseio.com/messageData');

////// SERVE STATIC FILES

var newPath = path.join(__dirname, '../client/');
app.use(express.static(newPath));

/// POST

app.post('/classes/messages', function(req, res) {

  var dat = '';
  req.on('data', function(chunk) {
    dat += chunk;
  });

  req.on('end', function() {
    dat = JSON.parse(dat);
    myRootRef.push(dat);
    res.end();
  });
});

/// GET

app.get('/classes/messages', function(req, res) {
  // serve messages here

  myRootRef.once("value", function(snapshot) {

    var resultsObj = snapshot.val();
    var results = [];

    for (var k in resultsObj) {
      results.push(resultsObj[k]);
    }
    var result = JSON.stringify(results);
    res.end(result);

  });

});

app.listen(3000);

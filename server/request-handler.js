//import node's module "url"
var url = require("url");
var Firebase = require("firebase");
var io = require('socket.io');

var myRootRef = new Firebase('https://blinding-torch-85.firebaseio.com/messageData');


// handle requests
exports.handler = function(request, response) {

  var statusCode;
  var parsedUrl =  url.parse(request.url);

  console.log("Serving request type " + request.method + " for url " + request.url);

  statusCode = 200;

    //////////////////////////
   //handle OPTIONS request//
  //////////////////////////

  if (request.method === 'OPTIONS'){
    var headers = defaultCorsHeaders;
    response.writeHead(statusCode, headers);
    response.end();
  }

    //////////////////////////////////////
   //prompt for PUT and DELETE requests//
  //////////////////////////////////////


  if (request.method === 'PUT'){
    console.log('now you need to write a PUT handler')
  }

  if (request.method === 'DELETE'){
    console.log('now you need to write a DELETE handler')
  }

    ///////////////////////////////
   //handle GET and Post request//
  ///////////////////////////////

  if (request.method === "GET" && parsedUrl.path.slice(0,9) === '/classes/') {

    statusCode = 200;
    var headers = defaultCorsHeaders;

    headers["Content-Type"] =  "application/json";

    response.writeHead(statusCode, headers);

    myRootRef.once("value", function(snapshot) {
      var resultsObj = snapshot.val();
      var results = [];

      for (var k in resultsObj) {
        results.push(resultsObj[k]);
      }
      var result = JSON.stringify(results);
      response.end(result);

    });


  } else if (request.method === "POST"){
    statusCode = 201;

    var dat = "";
    request.on('data', function(chunk) {
      dat += chunk;
    });

    request.on('end', function() {

      var parseDat = JSON.parse(dat);
      myRootRef.push(parseDat);

      var headers = defaultCorsHeaders;
      headers["Content-Type"] =  "application/json";
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify({}));
    });

    //////////////////////////
   //return 404 for bad req//
  //////////////////////////

  } else {
    statusCode = 404;
    response.writeHead(statusCode);
    response.end();
  }
};

// default Cross Origin Resource Sharing Headers.

defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

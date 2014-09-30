/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var url = require("url");

var messageData = {
  results: []
};

exports.handler = function(request, response) {

  var statusCode;
  var parsedUrl =  url.parse(request.url);

  console.log("Serving request type " + request.method + " for url " + request.url);

  statusCode = 200;

  if (request.method === 'OPTIONS'){
    var headers = defaultCorsHeaders;
    response.writeHead(statusCode, headers);
    response.end();
  }


  if (request.method === "GET" && parsedUrl.path.slice(0,9) === '/classes/') {

    statusCode = 200;
    var headers = defaultCorsHeaders;

    headers["Content-Type"] =  "application/json";

    response.writeHead(statusCode, headers);

    var result = JSON.stringify(messageData);
    response.end(result);

  } else if (request.method === "POST"){
    statusCode = 201;

    var dat = "";
    request.on('data', function(chunk) {
      dat += chunk;
    });

    request.on('end', function() {

      var parseDat = JSON.parse(dat);
      messageData.results.push(parseDat);

      var headers = defaultCorsHeaders;
      headers["Content-Type"] =  "application/json";
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify({}));
    });
  } else {
    statusCode = 404;
    response.writeHead(statusCode);
    response.end();
  }
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

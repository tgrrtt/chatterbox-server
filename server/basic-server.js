/* Import node's http module: */
var http = require("http");
var fileHandler = require("./file-server-handler.js");
var apiHandler = require("./request-handler.js");

var port = 3000;

var ip = "127.0.0.1";

// create a file server on one port
var fileServer = http.createServer(fileHandler.handler);
console.log("Listening on http://" + ip + ":" + port);
fileServer.listen(port, ip);


//create an apiServer on another port
var apiServer = http.createServer(apiHandler.handler);
console.log("Listening on http://" + ip + ":8080");
apiServer.listen(8080, ip);

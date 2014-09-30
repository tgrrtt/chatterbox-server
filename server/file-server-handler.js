// Serves local files
//
var url = require("url");
var fs = require("fs");
var path = require("path");

exports.handler = function (req, res) {
  var newUrl = url.parse(req.url);
  fs.readFile(path.join(__dirname, "../client/") + newUrl.pathname, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
};

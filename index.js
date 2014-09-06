var http = require("http");
var server = require("./server.js").server;
server.listen(5000, "127.0.0.1");
console.log("Server listening on http://127.0.0.1:5000");


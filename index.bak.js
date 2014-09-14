var http = require("http");
var server = require("./server.js").server;
var port = (process.env.PORT || 5000);
var serverAddress = "localhost";
server.listen(port);// NB: Heroku doesn't let you specify server-address to listen on (although '0.0.0.0' might work).
console.log("Server listening on http://"+serverAddress+":"+port);


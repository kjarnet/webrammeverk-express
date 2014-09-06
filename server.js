var http = require("http");
exports.server = http.createServer(
    function(req, res) { var html = "<!doctype html>" +
        "<html><head><title>Hello world</title></head>" + "<body><h1>Hello, world!</h1></body></html>";
        res.writeHead(200, {
            // set the type of content we're returning "Content-Type": "text/html",
            // set the length of our content
            "Content-Length": html.length });
        res.end(html);
    }
);


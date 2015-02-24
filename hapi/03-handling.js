/**
 * REST WELL WITH HAPI
─────────────────────
 HANDLING
 Exercise 3 of 12

Create a server which responds to requests to / with a static HTML file named
index.html containing the following:

    <html>
        <head><title>Hello Handling</title></head>
        <body>
            Hello Handling
        </body>
    </html>

-------------------------------------------------------------------------------

## HINTS

You can declare handlers as objects instead of functions. The object must
contain one of the following: file, directory, proxy, or view.

For example, handler can be assigned an object with the file key:

    handler: {
        file: "index.html"
    }
 */


var Hapi = require('hapi');
var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080));

server.route({
    method: 'GET',
    path: '/',
    handler: {file: '03-index.html'}
});

server.start(function () {
  console.log('running');
});

/**
 * Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var Hapi = require('hapi');
    var path = require('path');

    var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080));
    server.route({
        method: 'GET',
        path: '/',
        handler: {
            file: path.join(__dirname, '/index.html')
        }
    });
    server.start();

────────────────────────────────────────────────────────────────────────────────
 */

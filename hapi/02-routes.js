/**
 * ─────────────────────
 ROUTES
 Exercise 2 of 12

Create a hapi server that listens on port on a port passed from the
command line and outputs
"Hello [name]" where [name] is replaced with the path parameter
supplied to GET /{name}

When you have completed your server, you can run it in the test
environment with:

  {bold}makemehapi run program.js{/bold}

And once you are ready to verify it then run:

  {bold}makemehapi verify program.js{/bold}

-------------------------------------------------------------------------------

## HINTS

Create a server that listens on port 8080, if none is passed from the
command line,  with the following code:

    var Hapi = require('hapi');
    var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080));

Add a route handler similar to the following:

    function handler (request, reply) {
        reply('Hello ' + request.params.name);
    }
 */


var Hapi = require('hapi');
var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080));

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
      reply('Hello ' + request.params.name);
    }
});

server.start(function () {
  console.log('running');
});

/**
 * Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var Hapi = require('hapi');
    var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080));
    server.route({
        method: 'GET',
        path: '/{name}',
        handler: function (request, reply) {
            reply('Hello ' + request.params.name);
        }
    });
    server.start();

────────────────────────────────────────────────────────────────────────────────
 */

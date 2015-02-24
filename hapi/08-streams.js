/**
 *  STREAMS
 Exercise 8 of 12

Create a Hapi server which responds to GET requests to / by streaming a ROT13'd version of a file that contains:

    The Pursuit of Hapi-ness

Output should look like:

    Gur Chefhvg bs Uncv-arff

-------------------------------------------------------------------------------

## HINTS

### Stream

The Hapi handler reply function can accept a stream as an argument.

### File

The fs module has a createReadStream(pathToFile) function that would be useful.

### Simple ROT13

In this exercise, we'll be using rot13-stream. To install rot13-stream:

    npm install rot13-stream

 */

var fs = require('fs');
var rot13 = require('rot13-stream')(); // encryption module
var Hapi = require('hapi');
var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080));

// add routes
server.route({path: '/', method:'GET', handler: function (req, reply) {
  // console.log('boom', fs.createReadStream('08-file.txt').pipe(rot13));
  reply(fs.createReadStream('08-file.txt').pipe(rot13)); //a normal stream, piped to rot13
}});

server.start();

/**
 * Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var Fs = require('fs');
    var path = require('path');
    var Hapi = require('hapi');
    var rot13 = require('rot13-stream')();

    var server = Hapi.createServer('localhost', Number(process.argv[2] || 8081));

    server.route({
        method: "GET",
        path: "/",
        config: {
            handler: function (request, reply) {

                var thisfile = Fs.createReadStream(path.join(__dirname, '/input.txt'));

                reply(thisfile.pipe(rot13));
            }
        }
    });

    server.start();

────────────────────────────────────────────────────────────────────────────────
 */

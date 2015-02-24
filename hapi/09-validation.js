/**
 *  VALIDATION
 Exercise 9 of 12

Route configuration offers lots of ways to customize each endpoint offered by your hapi application.
One of those ways is through validation.

Validation can happen in parameters in the path, in inbound payload validation, and outbound response.
Objects for validation are defined
in the Joi validation framework.

Create a server that has a route configuration exposing an endpoint for
chickens. Specifically:

    /chickens

Within the route, add a path parameter named breed which has an attached validation within the route's configuration.
The solution will just check that a Validation object exists within the configuration for breed, not any specific validation.

-------------------------------------------------------------------------------

## HINTS

Create a server that listens on port 8080 with the following code:

    var routeConfig = {
        path: '/a/path/{with}/{parameters}',
        method: 'GET',
        handler: myHandler,
        config: {
            validate: {
                params: {
                    with: Joi.string().required(),
                    parameters: Joi.string().required()
                }
            }
        }
    }

All route information can be found here either in the Hapi directory
in node_modules under Reference.md.

Joi information can also be found in node_modules
 */

var fs = require('fs');
var Joi = require('joi');
var Hapi = require('hapi');
var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080));

// add routes
server.route({
  path: '/chickens/{breed}',
  method:'GET',
  handler: function (req, reply) {
    // console.log('boom', fs.createReadStream('08-file.txt').pipe(rot13));
    reply("hi"); //a normal stream, piped to rot13
  },
  config: {
    validate: {
      params: {
        breed: Joi.string().required()
      }
    }
  }
});

server.start();

/**
 * Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var Hapi = require('hapi');
    var Joi = require('joi');

    var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080));

    server.route({
        method: 'GET',
        path: '/chickens/{breed}',
        config: {
            handler: function (request, reply) {
                reply('You asked for the chicken ' + request.params.breed);
            },
            validate: {
                params: {
                    breed: Joi.string().required()
                }
            }
        }
    });

    server.start();

────────────────────────────────────────────────────────────────────────────────
 */

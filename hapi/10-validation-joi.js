/**
 *  VALIDATION USING JOI OBJECT
 Exercise 10 of 12

We can use a Joi to verify endpoints. By using a Joi object we can specified very customizable validation in path, request payloads, and responses.

Create a server that has a route configuration exposing an endpoint login which can be access
using 'POST' method. Specifically:

    /login

login endpoint will accept isGuest (boolean), username (string), accessToken (alphanumeric) and
password (alphanumeric) in post request body. Validation should follow following condition
i)   if isGuest is false then username is required.
ii)  password cannot appear together with accessToken.
iii) if any parameters other than specified above are sent then it should allow by validation.

-------------------------------------------------------------------------------

## HINTS

Create a server that listens on port 8080 with the following code:


    var routeConfig = {
        path: '/a/path/',
        method: 'POST',
        handler: myHandler,
        config: {
            validate: {
               payload : Joi.object({
                    username: Joi.string(),
                    password: Joi.string().alphanum(),
                    accessToken: Joi.string().alphanum(),
                    birthyear: Joi.number().integer().min(1900).max(2013),
                    email: Joi.string().email()
               }).options({allowUnknown: true}).with('username', 'birthyear').without('password', 'accessToken');
            }
        }
    }

Route information can be found in the Hapi directory
in node_modules/hapi/docs/Reference.md.

 */


var Joi = require('joi');
var Hapi = require('hapi');
var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080));

// add routes
server.route({
  path: '/login',
  method:'POST',
  handler: function (req, reply) {
    // console.log('boom', fs.createReadStream('08-file.txt').pipe(rot13));
    reply("login successful"); //a normal stream, piped to rot13
  },
  config: {
    validate: {
      payload: Joi.object({
        isGuest: Joi.boolean(),
        username: Joi.string().when('isGuest', { is: false, then: Joi.required() }),
        password: Joi.string().alphanum(),
        accessToken: Joi.string().alphanum()
      }).options({allowUnknown: true}).without('password', 'accessToken')
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
        method: 'POST',
        path: '/login',
        config: {
            handler: function (request, reply) {

                reply('login successful');
            },
            validate: {
                payload: Joi.object({
                    isGuest: Joi.boolean().required(),
                    username: Joi.when('isGuest', { is: false, then: Joi.required() }),
                    password: Joi.string().alphanum(),
                    accessToken: Joi.string().alphanum()
                }).options({ allowUnknown: true }).without('password', 'accessToken')
            }
        }
    });

    server.start();

────────────────────────────────────────────────────────────────────────────────
 */

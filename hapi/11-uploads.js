/**
 *  UPLOADS
 Exercise 11 of 12

Create a server that has a route configuration exposing a upload endpoint which can be access using 'POST' method. Specifically:

    /upload

form with description (string) and file (file) can be submitted to upload endpoint, upload endpoint only accept multipart/form-data content-type request. On form submit request to upload endpoint following response is expected

    {
      description :  //description from form
      file : {
        data :    //content of file uploaded
        filename:  //name of file uploaded
        headers :   //file header provided by hapi
      }
    }

-------------------------------------------------------------------------------

## HINTS

We can get file as readable stream by adding following config in route


    config: {
        output : 'stream',
        parse : true
    }

If file uploaded with parameter file then we can read it in handler function from route using following code

    handler: function (request, reply) {
        var body = '';
        request.payload.file.on('data', function (data){

          body += data
        })
        request.payload.file.on('end', function (){

          console.log(body)
        })
    }

More information about handling file upload can be found in the Hapi directory in node_modules under Reference.md.
 */


var Joi = require('joi');
var Hapi = require('hapi');
var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080));

// add routes
server.route({
  path: '/upload',
  method:'POST',
  handler: function (request, reply) {
    var body = '';
    // process the upload stream
    request.payload.file.on('data', function (data){
      body += data;
    });
    request.payload.file.on('end', function (){
      var resp = {
        description :  request.payload.description,//description from form
        file : {
          data : body, //content of file uploaded
          filename: request.payload.file.hapi.filename, //name of file uploaded
          headers :   request.payload.file.hapi.headers
        }
      }
      // console.log(request.payload);
      console.log(resp);
      reply(resp);
    });



  },
  config: {
    payload: {
      output : 'stream',
      parse : true
    }
    // validate: {
    //   payload: Joi.object({
    //     isGuest: Joi.boolean(),
    //     username: Joi.string().when('isGuest', { is: false, then: Joi.required() }),
    //     password: Joi.string().alphanum(),
    //     accessToken: Joi.string().alphanum()
    //   }).options({allowUnknown: true}).without('password', 'accessToken')
    // }
  }
});

server.start();

/**
 * Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var Hapi = require('hapi')


    var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080));

    server.route({
      method: 'POST',
      path: '/upload',
      config: {
        handler: function (request, reply) {

          var body = '';

          request.payload.file.on('data', function (data){

            body += data
          })

          request.payload.file.on('end', function (){

            var ret = {
              description: request.payload.description,
              file: {
                data: body,
                filename: request.payload.file.hapi.filename,
                headers: request.payload.file.hapi.headers
              }
            }

            reply(JSON.stringify(ret));
          })

        },
        payload: {
          output: 'stream',
          parse: true,
          allow: 'multipart/form-data'
        }
      }
    });

    server.start();

────────────────────────────────────────────────────────────────────────────────
 */

/**
 * COOKIES
 Exercise 12 of 12

Create a server that has a route configuration exposing an endpoint set-cookie and check-cookie which can be access using 'GET' request. Specifically:

    /set-cookie

set-cookie endpoint will set cookie with key 'session' and value as {key : 'makemehapi'}. Cookie  should be  base64json encoded, it should expire in 10 ms. Set domain scope of cookies as localhost.  You can return any value in response.

     /check-cookie

 check-cookie endpoint will have cookies received from /set-cookie endpoint. If session key is  present in cookies then simply  return {user : 'hapi'}. otherwise return  unauthorized  access error

-------------------------------------------------------------------------------

## HINTS

createServer takes an options object as a third parameter. Using this options object, we can configure the server to handle cookies in various way,


    var options = {
      state: {
        cookies: {
          parse: true ,
          failAction: 'log'
        }
      }
    };

Hapi provided way to manage cookies for specific url path.


    server.state('session', {
      path: '/',
    });

 We can set cookies while replying to request as follow,


     reply('success').state('session', 'session')

Cookies value are stored in server state. And we can access using following code,


      var session = request.state.session;

 */
var Hapi = require('hapi');
var options = {
  state: {
    cookies: {
      parse: true ,
      failAction: 'log'
    }
  }
};
var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080), options);

// Cookie settings
server.state('session', {
  path:'/{path*}',
  encoding: 'base64json',
  domain: 'localhost',
  ttl: 10
});

// add routes
server.route({
  path: '/set-cookie',
  method:'GET',
  handler: function (request, reply) {

    // console.log('cookies', request);
    // reply and set a session cookie
    reply('success').state('session', {key : 'makemehapi'});


  }
});

server.route({
  path: '/check-cookie',
  method:'GET',
  handler: function (request, reply) {
    // console.log(request.payload);
    //
    //
    var session = request.state.session;

    // console.log(session);

    if (session){
      reply({user : 'hapi'});
    } else {
      reply("unauthorized");
    }

  }
});

server.start();


/**
 Here's the official solution in case you want to compare notes:
 ────────────────────────────────────────────────────────────────────────────────
 var Hapi = require('hapi');

 var options = {
   state: {
     cookies: {
       parse: true ,
       failAction: 'log'
     }
   }
 };

 var server = Hapi.createServer('localhost', Number(process.argv[2] || 8000), options);


 server.state('session', {
   path: '/{path*}',
   encoding: 'base64json',
   ttl: 10,
   domain: 'localhost'
 });


 server.route(
   {
     method: 'GET',
     path: '/set-cookie',
     config: {
       handler: function (request, reply) {

         return reply({
           message : 'success'
         }).state('session', {
           key : 'makemehapi'
         });
       }
     }
   }
 )

 server.route(
   {
     method: 'GET',
     path: '/check-cookie',
     config: {
       handler: function (request, reply) {

         var session = request.state.session;
         var result;
         if (session) {
           result = {
             user : 'hapi'
           };
         } else {
           result = new Hapi.error.unauthorized('Missing authentication');
         }
         reply(result);
       }
     }
   }
 );

 server.start();
 ────────────────────────────────────────────────────────────────────────────────
 **/

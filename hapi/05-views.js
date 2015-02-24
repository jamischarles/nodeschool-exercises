/**
 * VIEWS
 Exercise 5 of 12

Create a server which responds to requests to /?name=Handling using a template
located at templates/index.html which outputs the following HTML:

    <html>
        <head><title>Hello Handling</title></head>
        <body>
            Hello Handling
        </body>
    </html>

-------------------------------------------------------------------------------

## HINTS

The view key can be used to define the template to be used to generate the
response.

    handler: {
        view: "index.html"
    }

server.views() is the server method that we use to configure the templates
used on our server. This method receives a configuration object in which we can
set different engines based on file extension. This object can also set a
directory path for your templates.

    server.views({
        engines: {
            html: require('handlebars')
        },
        path: Path.join(__dirname, 'templates')
    });

In this exercise, we'll be using Handlebars. To install handlebars:

    npm install handlebars

With Handlebars templates, you can render a variable directly in HTML by
surrounding the variable with curly braces, e.g. {{foo}}.

The template receives some information from the request. For example, the query
parameters that were passed in via the URL are available in the query object.
These parameters can then be used in the template.

    <div>{{query.paramName}}</div>
 */

var Path = require('path');

var Hapi = require('hapi');
var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080));

server.route({
  method: 'GET',
  path: '/',
  // handler: function (req, reply) {
  //   console.log(req.query.name);
  // }
  handler: {
    view: 'index.html'
  }
});

// set the engine and the template folder
server.views({
  engines: {
    html: require('handlebars')
  },
  path: Path.join(__dirname, 'templates')
});

server.start(function () {
  console.log('running');
});

/**
 * Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var Hapi = require('hapi');
    var Path = require('path');

    var server = Hapi.createServer('localhost', Number(process.argv[2] || 8080));

    server.views({
        engines: {
            html: require('handlebars')
        },
        path: Path.join(__dirname, 'templates')
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: {
            view: 'template.html'
        }
    });

    server.start();

────────────────────────────────────────────────────────────────────────────────
 */

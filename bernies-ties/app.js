/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, fs = require('fs');
var config = JSON.parse(fs.readFileSync('package.json'));
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/all_ties', routes.allTies);

exports.server = app;

app.listen(process.env.DEPLOY_PORT || config.port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

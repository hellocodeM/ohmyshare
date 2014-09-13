
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var search = require('./routes/search');
var DB = require("./DB")
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var config = require("./config");

config.baseDir = __dirname;

var app = express();

// all environments
app.set('port', 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.session({ secret: 'your secret here' }));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/search', search.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

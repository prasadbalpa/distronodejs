var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var app = new express();
var httpapp = new express();
var Instrument = require('./app/models/instrument');
var morgan = require('morgan');
var ejs = require('ejs');
var https = require('https');
var pem = require('pem');
var config = require('./app/config/database');
var http = require('http');

//connect to the mongodb and throw an error if it fails
console.log(config.mongoConnection);
mongoose.connect(config.mongoConnection, function(err) {
	if(err) throw err;
});
//port at which the server will be running
var port = process.env.PORT || 443;
//using the middleware to get the stats on the console.
app.use(morgan('dev'));
app.use(bodyparser.json()); // support json encoded bodies
app.use(bodyparser.urlencoded({ extended: false })); // support encoded bodies

require('./routes/router.js')(app);

app.set('views', './views');
app.set('view engine', 'ejs');
pem.createCertificate({days:1, selfSigned:true}, function(err, keys){
	  if(err) {
		  console.log("error in creating the key, shutting down the server");
		  throw err;
	  }
	 
	  https.createServer({key: keys.serviceKey, cert: keys.certificate}, app).listen(port);
});

httpapp.get("/", function(req, res) {
	res.redirect("https://" + request.headers.host + ":" + port + request.url);
});
httpapp.listen(80);
//var server = http.createServer(function(request, response) {
	//response.redirect("https://" + request.headers.host + request.url);
	//console.log("https://" + request.headers.host + request.url + port);
	//response.writeHead(302, {
		//  'Location': "https://" + request.headers.host + ":" + port + request.url
	     
		  //add other headers here...
		//});
		//response.end();
		
//});
//server.listen(80);
console.log('Server running...' + port);
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var httpsapp = new express();
var httpapp = new express();
var Instrument = require('./app/models/instrument');
var morgan = require('morgan');
var ejs = require('ejs');
var https = require('https');
var pem = require('pem');
var config = require('./app/config/database');
var http = require('http');
var mongooseconn = require('./routes/mongooseconn');
//connect to the mongodb and throw an error if it fails
//console.log(config.mongoConnection);
//mongoose.connect(config.mongoConnection, function(err) {
	//if(err) throw err;
//});
//port at which the server will be running
var port = process.env.PORT || 443;
//using the middleware to get the stats on the console.
httpsapp.use(morgan('dev'));
httpsapp.use(bodyparser.json()); // support json encoded bodies
httpsapp.use(bodyparser.urlencoded({ extended: false })); // support encoded bodies

require('./routes/router.js')(httpsapp);

httpsapp.set('views', './views');
httpsapp.set('view engine', 'ejs');
pem.createCertificate({days:1, selfSigned:true}, function(err, keys){
	  if(err) {
		  console.log("error in creating the key, shutting down the server");
		  throw err;
	  }
	 
	  https.createServer({key: keys.serviceKey, cert: keys.certificate}, httpsapp).listen(port);
});

//Use this for the purpose of redirecting the client requests that are http in nature.
httpapp.get("/", function(req, res) {
	//res.redirect("https://" + req.headers.host + ":" + port + req.url);
	res.send("I am just a http server....");
});
httpapp.listen(80);

console.log('Server running...' + port);
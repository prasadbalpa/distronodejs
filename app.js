var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var app = new express();
var Instrument = require('./app/models/instrument');
var morgan = require('morgan');
var ejs = require('ejs');
var https = require('https');
var pem = require('pem');

//connect to the mongodb and throw an error if it fails
mongoose.connect('mongodb://prasadk:raktheshwari@ds111589.mlab.com:11589/distro', function(err) {
	if(err) throw err;
});
//port at which the server will be running
var port = process.env.PORT || 28090;
//using the middleware to get the stats on the console.
app.use(morgan('dev'));
app.use(bodyparser.json()); // support json encoded bodies
app.use(bodyparser.urlencoded({ extended: false })); // support encoded bodies

//require('./routes/router.js')(app);

app.set('views', './views');
app.set('view engine', 'ejs');
pem.createCertificate({days:1, selfSigned:true}, function(err, keys){
	  //var app = express();
	  if(err) {
		  console.log("error in creating the key");
		  throw err;
	  }
	  app.get('/', function(req, res){
	    res.send('o hai!');
	  });
	 
	  https.createServer({key: keys.serviceKey, cert: keys.certificate}, app).listen(443);
});
//app.listen(port);

//console.log('Server running...' + port);
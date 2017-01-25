var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var app = new express();
var Instrument = require('./app/models/instrument');
var morgan = require('morgan');
var ejs = require('ejs');
//connect to the mongodb
mongoose.connect('mongodb://prasadk:raktheshwari@ds111589.mlab.com:11589/distro', function(err) {
	if(err) throw err;
});
//port at which the server will be running
var port = 28090;
//using the middleware to get the stats on the console.
app.use(morgan('dev'));
app.use(bodyparser.json()); // support json encoded bodies
app.use(bodyparser.urlencoded({ extended: false })); // support encoded bodies

app.get('/', function(req, res){
	console.log('hitting root api');
	var kam = 'enu samachara illa';
	res.render('index', {myvalue: kam});
});
//Create a new instrument in the mongoDB...
app.post('/instrument', function(req, res) {
	
	var newInstrument = new Instrument();
	
	var obj = JSON.parse(JSON.stringify(req.body), null, 2);
	
	console.log(obj);
	
	if (obj == null) throw err;
	
	console.log(obj.instrumentid);
	
	
	newInstrument.instrumentid = obj.instrumentid;
	newInstrument.customerid = obj.customerid;
	newInstrument.status = false;

	

	newInstrument.save(function(err) {
		if(err) throw err;
		console.log("Trying to read all of the instruments now and dump it back");
		Instrument.find({}, function(err, response) {
	    if(err) throw err;
		console.log(JSON.stringify(response), null, 2);
		res.json(response);
	});
		
        //res.send('You have successfully added');		
	});
	
	//res.setHeader('Content-Type', 'text/plain')
    //res.write('you posted:\n')
    //res.end(JSON.stringify(req.body, null, 2));
});

app.put('/instrument', function(req, res) {
	res.setHeader('Content-Type', 'text/plain')
    res.write('you put:\n')
    res.end(JSON.stringify(req.body, null, 2));
});

app.get('/instrument/:id', function(req, res) {
	//res.send('You are asking me for the read');
	Instrument.find({'_id': req.params.id}, function(err, response) {
	    if(err) throw err;
	    console.log(JSON.stringify(response), null, 2);
	    res.json(response);
	});
});


app.get('/instrument', function(req, res) {
	//res.send('You are asking me for the read');
	Instrument.find({}, function(err, response) {
	    if(err) throw err;
	    console.log(JSON.stringify(response), null, 2);
	    res.json(response);
	});
});

app.delete('/instrument', function(req, res) {
	//res.setHeader('Content-Type', 'text/plain');
    //res.write('you posted and asked for a delete uri\n');
    //res.end(JSON.stringify(req.body, null, 2));
	var newInstrument = new Instrument();
	
	var obj = JSON.parse(JSON.stringify(req.body), null, 2);
	
	if (obj == null) throw err;
	
	console.log(obj.id);
	
	Instrument.remove({'_id': obj.id}, function(err) {
		if(err) throw err;
		Instrument.find({}, function(err, response) {
	       if(err) throw err;
	       console.log(JSON.stringify(response), null, 2);
	       res.json(response);
	    });
	});
});

app.get('/instrument/:instrumentno/:customerid', function(req, res) {
	console.log('hitting instrument api');
	//var chris = new User();
	//chris.instrumentno = req.params.instrumentno;
	//chris.customerid = req.params.customerid;
	//chris.depositdate = Date.now;
	//chris.status = false;
	
	//chris.save(function(err) {
      //  if (err) throw err;

        //console.log('User saved successfully!');
    //});
	//res.send('Saved Successfully');
});

app.get('/instrument/users', function(req, res) {
	var chris = new User();
	
	User.find({}, function(err, db_users) { 
	    if(err) throw err;
	    res.send(db_users);
	});
	
});

app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(port);

console.log('Server running...' + port);
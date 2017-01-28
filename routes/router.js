/**
 * 
 */
var Instrument = require('../app/models/instrument');
var User = require('../app/models/customer');
module.exports = function(app) {
	app.get('/', function(req, res){
		console.log('hitting root api');
		var kam = 'This is a placeholder for the message';
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
			

		});
		

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

		Instrument.find({}, function(err, response) {
		    if(err) throw err;
		    console.log(JSON.stringify(response), null, 2);
		    res.json(response);
		});
	});

	app.delete('/instrument', function(req, res) {

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
	
	});

	app.get('/instrument/users', function(req, res) {
		var chris = new User();
		
		User.find({}, function(err, db_users) { 
		    if(err) throw err;
		    res.send(db_users);
		});
		
	});

	
}
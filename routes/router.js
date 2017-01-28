/**
 * 
 */
var Instrument = require('../app/models/instrument');
var User = require('../app/models/customer');
var tokens = require('../app/models/tokenmgmt');

module.exports = function(app) {
	/*root URL*/
	app.get('/', function(req, res){
		console.log('hitting root api');
		var kam = 'This is a placeholder for the message';
		res.render('index', {myvalue: kam});
	});
	app.get('/login', function(req, res){
		console.log('hitting root api');
		//Check if this user(identified by the token) is already logged in using the tokenmgmt, need to verify the login state
		var kam = 'This is a placeholder for the message';
		res.render('index', {myvalue: kam});
	});
	
    //****************************Manage instrument APIs**************************/
	
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

	app.get('/instrument/:customerid', function(req, res) {
		console.log('get all instruments for a customer');
	
	});

	
	//****************************Manage instrument APIs**************************/
	
}
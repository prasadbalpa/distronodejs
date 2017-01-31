/**
 * 
 */
var Instrument = require('../app/models/instrument');
var User = require('../app/models/customer');
var tokens = require('../app/models/tokenmgmt');
var randtoken = require('rand-token');

module.exports = function(app) {
	/*root URL*/
	app.post('/otp', function(req, res) {
		//This will be hit after you have sent me the mobile number
		//We will implement that later....for now, it is not secure.....
	});
	app.get('/', function(req, res){
		console.log('hitting root api'); //console logging
		var kam = 'This is a placeholder for the message';
		res.render('index', {myvalue: kam});
	});
	app.post('/login', function(req, res){
		//console.log(req.headers.authorization);
		if(req.headers.authorization != undefined) {
			//matched a user TODO:real user check, user is already checked in.
			var obj = JSON.parse(JSON.stringify(req.body), null, 2);
			User.find({userid:obj.mobile, access_token:obj.access_token}, function(error, response) {
				if(error) throw error;
				res.send('{Found user with this bearer token}');
				
			});
			console.log("user id: " + req.headers.userid)
			//res.send("{ok}");
		} else if(req.headers.authorization == undefined) { //not logged in...provide a token
			var newUser = new User();
			var obj = JSON.parse(JSON.stringify(req.body), null, 2);
			
			
			console.log(obj.userid);
			
			if (obj == null) throw err;
			
			console.log(obj.userid);
			newUser.mobile = obj.userid;
			
			var token = randtoken.generate(16);
			res.set('access_token', "'" + token + "'");
			newUser.access_token = token;
			newUser.role = 'user';
			console.log("User:" + newUser.mobile);
			console.log("access_token:" + newUser.access_token);
			console.log("type:" + newUser.role);
			newUser.save(function(err) {
				if(err) throw err;
				console.log("Trying to read all of the instruments now and dump it back");
			    if(err) {
			    	 throw err;
			    	 res.send("{not ok}");
			    }
				//console.log(JSON.stringify(response), null, 2);
			    res.send("{access_token:" + token);
			  });
			
		} else {
			res.send("{not ok}");
		}
		//check if authorization is not nill, if the user is already logged in, if yes, redirect to basic info.
		//if not a logged in user, then send a otp via tropo.  
		//if user returns with an otp in the post body, then, validate otp and redirect to basic info.
		////console.log('hitting root api');
		//Check if this user(identified by the token) is already logged in using the tokenmgmt, need to verify the login state
		//var kam = 'This is a placeholder for the message';
		//res.render('index', {myvalue: kam});
	});
	
    //****************************Manage instrument APIs**************************/
	//This is for a specific use case
	app.post('/instrument', function(req, res) {
		
		var newInstrument = new Instrument();
		
		var obj = JSON.parse(JSON.stringify(req.body), null, 2);
		
		console.log(obj);
		
		if (obj == null) throw err;
		
		console.log(obj.instrumentid);
		
		newInstrument.userid = obj.userid;
		newInstrument.instrumentid = obj.instrumentid;
		newInstrument.customerid = obj.customerid;
		newInstrument.status = false;

		
        try {
		  newInstrument.save(function(err) {
			if(err) throw err;
			console.log("Trying to read all of the instruments now and dump it back");
			//Instrument.find({userid: obj.userid}, function(err, response) {
		    if(err) {
		    	 throw err;
		    }
			//console.log(JSON.stringify(response), null, 2);
			res.json("{ok}");
		  });
        } catch(err) {
        	res.json("{not ok}")
        }
			
	});

	app.put('/instrument', function(req, res) {
		res.setHeader('Content-Type', 'text/plain')
	    res.write('you put:\n')
	    res.end(JSON.stringify(req.body, null, 2));
	});

	app.get('/instrument/:id', function(req, res) {
		
		if(req.headers.authorization == undefined) {
			res.redirect("{not ok}");
		} else {
			//var obj = JSON.parse(JSON.stringify(req.body), null, 2);
			console.log(req.params.id + "::" + req.headers.authorization)
			User.find({userid:req.params.id, access_token:req.headers.authorization}, function(error, response) {
				if(error) {
					throw error;
				} else {
					
				    console.log('{Found user with this bearer token}');
				    Instrument.find({'_id': req.params.id}, function(err, response) {
				        if(err) throw err;
				        console.log(JSON.stringify(response), null, 2);
				        res.json(response);
				    });
				}
			});
		}
		
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
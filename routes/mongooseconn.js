/**
 * Adding all of the mongooes related information.
 */
var mongoose = require('mongoose');
var config = require('../app/config/database');
try {
	var mongooseconn = mongoose.connect(config.mongoConnection, function(err) {
		if(err) {
			console.log("Error occurred in the connection.....")
			throw err;
		}
	});
} catch (err ){
	console.log("Error occured in the connection....handling in the catch")
	
}




module.exports = mongooseconn;
//end of mongoose connection

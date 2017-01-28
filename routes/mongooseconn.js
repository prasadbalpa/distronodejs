/**
 * Adding all of the mongooes related information.
 */
var mongoose = require('mongoose');
var config = require('../app/config/database');

var mongooseconn = mongoose.connect(config.mongoConnection, function(err) {
	if(err) throw err;
});

module.exports = mongooseconn;
//Adding a new comment
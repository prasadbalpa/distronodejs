/**
 * 
 */
var mongoose = require('mongoose');
var config = require('./app/config/database');

mongoose.connect(config.mongoConnection, function(err) {
	if(err) throw err;
});

module.exports = mongooseconn;

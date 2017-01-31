/**
 * 
 */
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the schema
var tokenSchema = new Schema({
  userid: { type: String, require: true},
  tokenid: { type: String, required: true},
  expired: {type: Boolean, default: false, required: true}
});

// the schema is useless so far
// we need to create a model using it
var tokens = mongoose.model('tokens', tokenSchema);

// make this available to our users in our Node applications
module.exports = tokens;
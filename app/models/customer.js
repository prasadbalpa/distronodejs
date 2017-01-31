/**
 * 
 */
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the schema
var userSchema = new Schema({  
  mobile: { type: String, required: true},
  access_token: {type:String},
  role: {type: String, enum: ['admin', 'user']}  
});


var User = mongoose.model('User', userSchema);

module.exports = User;
/**
 * 
 */
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the schema
var userSchema = new Schema({  
  mobile: { type: String, required: true, index: {unique:true}},
  access_token: {type:String},
  role: {type: String, enum: ['admin', 'user']},
  instruments: [String]
});


var User = mongoose.model('Userdata', userSchema);

module.exports = User;
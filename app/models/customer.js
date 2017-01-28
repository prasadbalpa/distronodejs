/**
 * 
 */
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the schema
var userSchema = new Schema({
  
  name: { type: String, required:true },
  mobile: { type: String, required: true},
  email: {type: String, default: Date.now},
  address: {type: String},
  role: {type: String, enum: ['admin', 'user']}
  
});


var User = mongoose.model('User', userSchema);

module.exports = User;
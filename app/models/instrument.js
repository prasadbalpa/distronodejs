// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the schema
var instrumentSchema = new Schema({
  
  instrumentid: { type: String, required:true },
  customerid: { type: String, required: true},
  depositdate: {type: Date, default: Date.now, required: true},
  status: {type: Boolean, default: false}
 
});

// the schema is useless so far
// we need to create a model using it
var Instrument = mongoose.model('Instrument', instrumentSchema);

// make this available to our users in our Node applications
module.exports = Instrument;
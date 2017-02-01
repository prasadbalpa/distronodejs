/**
 * 
 */
var client = require('twilio')('AC2e0023e5a30696ec722794e36bd40223', '2407a1cfea45ff3fd05c4204776db720');
var sendmsg = function (conf, callback) {
		client.sendMessage(conf, function(err, data){
		    if(err) 
		       console.log("error");
	        console.log(data);
	        callback(err, data);
		});
}

exports.sendmsg = sendmsg;
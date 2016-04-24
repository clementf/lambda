var amqp = require('amqplib/callback_api');
var Tail = require('tail').Tail;
tail = new Tail("/usr/local/var/log/nginx/access.log");


amqp.connect('amqp://localhost', function(err, conn) {
	conn.createChannel(function(err, ch) {
		var channel = 'logs';
		tail.on("line", function(data) {
			//parse the log with regex to get good infos
			var toSend = '';			
			toSend = dissect(data);
			if (toSend === null)
				console.log("Detect pattern failed");
			else {
				toSend.date = new Date();
				toSend.verb = toSend.verb.replace(/\"/g, '');
				toSend.protocol = toSend.protocol.replace(/\"/g, '');
				toSend.user_agent = toSend.user_agent.replace(/\"/g, '');				
				ch.assertExchange(channel, 'fanout', {
					durable: false
				});
				ch.publish(channel, '', new Buffer(JSON.stringify(toSend)));				
			}
		});
	});
});


var dissect = function(string) {
	var matches = string.match(regex),
		ret = {};

	if (!matches) return null;
	for (var k in map) {
		var v = map[k];
		ret[v] = matches[k];
	}
	return ret;
}



var regex = /(([0-9]{1,3}\.){3}[0-9]{1,3})(\-?\s?){3}(\S+? .\S+?\]) (\S+?) (\S+?) (\S+?) ([0-9]{3})(\-?\s?)([0-9]{4})? ([0-9]{1,9}\.?([0-9]{3})?) (\S+?) (.*)/;
var map = {
	1: 'remote_addr',
	4: 'date',
	5: 'verb',
	6: 'url',
	7: 'protocol',
	8 : 'code',
	11: 'weight',
	14 : 'user_agent'
};
var amqp = require('amqplib/callback_api');
var updateViews = require('./update_views');

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var channel = 'logs';

        ch.assertExchange(channel, 'fanout', {
            durable: false
        });

        ch.assertQueue('', {
            exclusive: true
        }, function(err, q) {
            ch.bindQueue(q.queue, channel, '');

            ch.consume(q.queue, function(msg) {                    
                //get the message and save it to the database                    
                var log = JSON.parse(msg.content);
                
                //Format the date to real date format for mongodb storage
                log.date = new Date(log.date);
                log.weight = parseInt(log.weight);


                //Save in database
                updateViews.update(log)
            }, {
                noAck: true
            });
        });
    });
});
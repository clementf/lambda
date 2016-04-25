var amqp = require('amqplib/callback_api');
var MongoClient = require('mongodb').MongoClient

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var channel = 'logs';
        var url = 'mongodb://localhost:27017/lambda';

        MongoClient.connect(url, function(err, db) {            
            var logs = db.collection('logs_raw');
            console.log('Log receiver connected to mongodb');

            ch.assertExchange(channel, 'fanout', {
                durable: false
            });

            ch.assertQueue('', {
                exclusive: true
            }, function(err, q) {
                ch.bindQueue(q.queue, channel, '');

                ch.consume(q.queue, function(msg) {                    
                    //get the message and save it to the database                    
                    var toSave = JSON.parse(msg.content);
                    
                    //Format the date to real date format for mongodb storage
                    toSave.date = new Date(toSave.date);
                    toSave.weight = parseInt(toSave.weight);


                    //Save in database
                    logs.save(toSave);
                }, {
                    noAck: true
                });
            });
        });
    });
});
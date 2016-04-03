var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.set('port', process.env.PORT || 5000);


var router = require('./router');
app.use(router);

//Static content


var oneDay = 86400000;
app.use(express.static('dashboard'));

app.use('/', function(req, res){
	res.sendFile(__dirname + '/dashboard/index.html')
});

var server = require('http').createServer(app);
server.listen(app.get('port'), function() {
	console.log('server started on port : ' + app.get('port'));
});
var express = require('express');
var app = express();

app.get('/', function(request, response) {
	//throw 'error'
	response.send('Ok');
});

// app.listen(3000, function() {
// 	console.log('Listening on port 3000');
// });

module.exports = app;
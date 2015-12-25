var express = require('express');
var app = express();

app.use(express.static('./public'));

app.get('/', function(request, response) {
	//throw 'error'
	response.send('Ok');
});

//first end-point; making a request to '/cities'
app.get('/cities', function(request, response) {
	var cities = ['Lotopia', 'Caspiana', 'Indigo'];
	response.send(cities);
});

// app.listen(3000, function() {
// 	console.log('Listening on port 3000');
// });

module.exports = app;
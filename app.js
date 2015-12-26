var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({extended:false});

app.use(express.static('./public'));

var cities = {
		"Lotopia":"City of Doom", 
		"Caspiana": "The last city before the Hydra's lair", 
		"Sonora": "Only the bad come to Sonora"
	};

app.get('/', function(request, response) {
	//throw 'error'
	response.send('Ok');
});

//first end-point; making a request to '/cities'
app.get('/cities', function(request, response) {
	response.send(Object.keys(cities));
});

//creating new cities
app.post('/cities', urlencode, function(request, response) {
	var newCity = request.body;
	cities[newCity.name] = newCity.description;
	response.status(201).json(newCity.name);
});

// app.listen(3000, function() {
// 	console.log('Listening on port 3000');
// });

module.exports = app;
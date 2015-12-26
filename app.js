var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({extended:false});

var redis = require('redis');
var	client = redis.createClient();
//client.select((process.env.NODE_ENV || 'development').length);


// client.hset('cities', 'Lotopia', 'City of Doom');
// client.hset('cities', 'Caspiana', "The last city before the Hydra's lair");
// client.hset('cities', "Sonora", "Only the bad come to Sonora");

app.use(express.static('./public'));

// var cities = {
// 		"Lotopia":"City of Doom", 
// 		"Caspiana": "The last city before the Hydra's lair", 
// 		"Sonora": "Only the bad come to Sonora"
// 	};

app.get('/', function(request, response) {
	//throw 'error'
	response.send('Ok');
});

//first end-point; making a request to '/cities'
app.get('/cities', function(request, response) {
	client.hkeys('cities', function(error, names) {
		if(error) throw error;
		response.json(names);
	});
});
	// response.send(Object.keys(cities));


//creating new cities
app.post('/cities', urlencode, function(request, response) {
	var newCity = request.body;
	client.hset('cities', newCity.name, newCity.description, function(error) {
		if (error) throw error;
		response.status(201).json(newCity.name);
	});
});

	// cities[newCity.name] = newCity.description;	

// app.listen(3000, function() {
// 	console.log('Listening on port 3000');
// });

module.exports = app;
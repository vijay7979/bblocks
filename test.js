var request = require('supertest');
var app = require('./app');

var redis = require('redis');
var	client = redis.createClient();
client.select('test'.length);
client.flushdb();

describe('Requests to the root path', function () {
	it('Returns a 200 status code', function(done) {
		request(app)
		.get('/')
		.expect(200)
		.end(function(error) {
			if (error) throw error;
			done();
		});
	});

	it('Returns a HTML format', function(done) {
		request(app)
			.get('/')
			.expect('Content-Type', /html/, done);	//a short-cut instead of calling the 'end' function
	});

	it('Returns an index file with Cities', function(done) {
		request(app)
			.get('/')
			.expect(/cities/i, done);
	});
});

//for our first end-point; making a request to "cities",
//and getting back an array of cities.
describe('Listing cities on /cities',function() {
	it('Returns 200 status code', function(done) {
		request(app)
			.get('/cities')
			.expect(200, done);	
	});

	it('Returns JSON format', function(done) {
		request(app)
			.get('/cities')
			.expect('Content-Type', /json/, done);	//where /json/ is a regular expression
	});

	it('Returns initial cities', function(done) {
    request(app)
      .get('/cities')
      .expect(JSON.stringify([]), done);
  });
});

//creating new cities
describe('Creating new cities', function() {
	it('Returns a 201 status code', function(done) {
		request(app)
			.post('/cities')
			.send('name=Springfield&description=where+the+simpsons+live')
			.expect(201, done);
	});

	it('Return the city name', function(done) {
		request(app)
			.post('/cities')
			.send('name=Springfield&description=where+the+simpsons+live')
			.expect(/Springfield/i, done);
	});

	it('Validates name and description of city', function(done) {
		request(app)
			.post('/cities')
			.send('name=&description=')
			.expect(400, done);	//400 being a bad request
	});
});

//deleting cities
describe('Deleting cities', function() {

	before(function() {
		client.hset('cities', 'Bananatown', 'the main dock for agricultural produce exports');
	});

	after(function() {
		client.flushdb();
	});

	it('Returns a 204 status code', function(done) {	//204 being succcessful but with no content
		request(app)
			.delete('/cities/Bananatown')
			.expect(204, done);
	});
});





//without mocha

// request(app)
// 	.get('/')
// 	.expect(200)
// 	.end(function(error) {
// 		if (error) throw error;
// 		console.log('Done');
// 	})
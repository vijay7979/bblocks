var request = require('supertest');
var app = require('./app');

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
			.expect('Content-Type', /html/, done);
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
			.expect(200, done);	//a short-cut instead of calling the 'end' function
	});

	it('Returns JSON format', function(done) {
		request(app)
			.get('/cities')
			.expect('Content-Type', /json/, done);	//where /json/ is a regular expression
	});

	it('Returns initial cities', function(done) {
    request(app)
      .get('/cities')
      .expect(JSON.stringify(['Lotopia', 'Caspiana', 'Sonora']), done);
  });
});

//creating new cities
describe('Creating new cities', function() {
	it('Returns a 201 status code', function(done) {
		request(app)
			.post('/cities')
			.send('name=Springfield&descrption=where+the+simpsons+live')
			.expect(201, done);
	});

	it('Return the city name', function(done) {
		request(app)
			.post('/cities')
			.send('name=Springfield&descrption=where+the+simpsons+live')
			.expect(/Springfield/i, done);
	})
});





//without mocha

// request(app)
// 	.get('/')
// 	.expect(200)
// 	.end(function(error) {
// 		if (error) throw error;
// 		console.log('Done');
// 	})
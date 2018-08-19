'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var randomString = require('random-string');
var Request = require('./model/requests');

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;

mongoose.connect('mongodb://127.0.0.1:27017/osloboditelj', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

	res.setHeader('Cache-Control', 'no-cache');
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'API Initialized!'});
});

router.route('/request').post(function(req, res) {
	var hash = randomString({length: 15, numeric: true, letters: true, special: false});
	var request = new Request();
	request.images = req.body.images;
	request.hash = hash;
	request.save(function(err) {
		if (err) {
			res.send(err);
		}
		res.json({ hash: hash });
	});
});

router.route('/request/:hash').get(function(req, res) {
	var hash = req.params.hash;
	Request.findOne({hash : hash}, function(err, request) {
		if (err) {
			res.send(err);
		}
		if (request == null) {
			res.json({});
		}
		res.json({ images : request.images });
	});
});

app.use('/api', router);

app.listen(port, function() {
	console.log(`api running on port ${port}`);
});

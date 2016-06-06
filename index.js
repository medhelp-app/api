var morgan = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var cors = require('cors');
var jwt = require('jsonwebtoken');

var config = require('./config');

var mongoose = require('mongoose');
mongoose.connect(config.database);

var app = express();
app.set('superSecret', config.secret);
app.use(morgan('dev'));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});*/

global.getSuperSecret = app.get('superSecret');

app.use(function (req, res, next) {
	if (req.url.indexOf('/users/login') >= 0 || (req.url.indexOf('/users') >= 0 && req.method == 'POST')) {
		next();
	} else {
		var token = req.body.token  || req.query.token || req.headers['x-access-token'];

		if (token) {
			jwt.verify(token, global.getSuperSecret, function (error, decoded) {
				if (error) {
					return res.json({
						success: false,
						message: 'Token inválido'
					});
				} else {
					req.decoded = decoded;
					next();
				}
			})
		} else {
			return res.status(403).send({
				success: false,
				message: 'Nenhum token enviado'
			});
		}
	}
});

app.use('/api/users', require('./routes/user.js'));
app.use('/api/doctors', require('./routes/doctor.js'));
app.use('/api/patients', require('./routes/patient.js'));
app.use('/api/archives', require('./routes/archive.js'));

var port = Number(process.env.PORT || 8080);

app.listen(port, function () {
	console.log('Server running at port ' + port);
});
var morgan = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');

var cors = require('cors');
var jwt = require('jsonwebtoken');

var config = require('./config');

require('./util/functions.js');

var mongoose = require('mongoose');
mongoose.connect(config.database);

global.encrypt = require('mongoose-encryption');
global.encKey = 'EX1hDCQYllyoxX1UpxrESDukXXhA4XWj6QEiBHNGSAw=';
global.sigKey = 's6SyKsO4vtIaXKBoXyi6HUhIh7f8mgIZM4x19Qt25/c/okJAezsYv0J5EactPb77kKT9KaKJdoJsVLL5W5IJrw==';

var app = express();
app.set('superSecret', config.secret);
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

global.getSuperSecret = app.get('superSecret');


app.use(function (req, res, next) {
	if (req.url.indexOf('/users/login') >= 0 || req.url.indexOf('password') >= 0 || 
		(req.url.indexOf('/users') >= 0 && req.method == 'POST')) {
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
app.use('/api/drugstores', require('./routes/drugstore.js'));
app.use('/api/hospitals', require('./routes/hospital.js'));
app.use('/api/medicines', require('./routes/medicine.js'));
app.use('/api/publications', require('./routes/publication.js'));
app.use('/api/diseases', require('./routes/disease.js'));

var port = Number(process.env.PORT || 8080);

app.listen(port, function () {
	console.log('Server running at port ' + port);
});
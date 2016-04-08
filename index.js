var express = require('express');
var app = express();

app.get('/', function (req, res) {
	res.send('Initial page');
});

app.listen(80, function () {
	console.log('Server running at port 80');
});
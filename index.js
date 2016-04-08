var express = require('express');
var app = express();

app.use('/api/users', require('./routes/user.js'));

app.listen(80, function () {
	console.log('Server running at port 80');
});
var express = require('express');
var router = express.Router();

router.route('/').get(function (req, res) {
	res.send('Get all users');
});

router.route('/:id').get(function (req, res) {
	res.send('Get a specific user');
});

router.route('/').post(function (req, res) {
	res.send('Insert a user');
});

router.route('/:id').put(function (req, res) {
	res.send('Update a specific user');
});

router.route('/:id').delete(function (req, res) {
	res.send('Delete a specific user');
});

module.exports = router;
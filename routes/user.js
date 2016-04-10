var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user');
var userController = new UserController();

router.route('/').get(function (req, res) {
	userController.getAll(function (users, error) {
		if (error) {
			res.send(error);
		} else {
			res.json(users);
		}
	});
});

module.exports = router;
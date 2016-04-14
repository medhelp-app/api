var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user');
var userController = new UserController();

router.route('/').get(function (req, res) {
	userController.getAll(function (users, error) {
		if (error) {
			res.status(400);
			res.send(error);
		} else {
			res.json(users);
		}
	});
});

router.route('/').post(function (req, res) {
	userController.insert(req.body, function (user, error) {
		if (error) {
			res.status(400);
			res.send(error);
		} else {
			res.json(user);
		}
	});
});

router.route('/login').post(function (req, res) {
	userController.login(req.body, function (user, error) {
		if (error) {
			res.status(400);
			res.send(error);
		} else {
			res.json(user);
		}
	});
});

module.exports = router;
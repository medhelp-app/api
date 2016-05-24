var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var UserController = require('../controllers/user');
var userController = new UserController();

router.route('/').get(function (req, res) {
	userController.getAll(function (users, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(users);
		}
	});
});

router.route('/').post(function (req, res) {
	console.log(req.body);
	
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
			res.status(401);
			res.send(error);
		} else {
			var token = jwt.sign(user, global.getSuperSecret, {
				expiresIn: '1h'
			});

			res.json({
				user: user,
				token: token
			});
		}
	});
});
router.route('/:id').put(function (req, res) {
	userController.update(req.params.id, req.body, function (user, error) {
		if (error) {
			res.status(400);
			res.send(error);
		} else {
			res.json(user);
		}

	});
});
module.exports = router;
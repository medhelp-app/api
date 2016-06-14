var express = require('express');
var router = express.Router();
var multer = require('multer');

var jwt = require('jsonwebtoken');

var UserController = require('../controllers/user');
var userController = new UserController();

var FollowController = require('../controllers/follow');
var followController = new FollowController();

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

router.route('/:id').get(function (req, res) {
	userController.getForId(req.params.id, function (users, error) {
		if (error) {
			res.status(404);
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

router.route('/:email/password/forgottenPassword').get(function (req, res) {
	userController.forgottenPassword_sendToken(req.params.email,function (result, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(result);
		}
	});
});
router.route('/:id/password/').put(function (req, res) {
	userController.updatePassword(req.params.id, req.body,function (result, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(result);
		}
	});
});

router.route('/:id/password/forgottenPassword').put(function (req, res) {
	userController.forgottenPassword(req.params.id,req.body,function (result, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(result);
		}
	});
});

/*-------------------------Following a Doctor-------------------------------*/

router.route('/follow').post(function (req, res) {
	followController.insert(req.body,function (result, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(result);
		}
	});
});

router.route('/follow/:idDoctor/:idPatient').delete(function (req, res) {
	followController.delete(req.params.idDoctor, req.params.idPatient, function (result, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(result);
		}
	});
});

router.route('/:id/image').put(multer({
  dest: './uploads/',
  rename: function (fieldname, filename) {
    return fieldname;
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...')
  },
  limits: {
    files: 1
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path)
  }
}).single('profileImage'),function (req, res) {
    userController.updateImage(req.params.id, req.file, function (patient, error) {
        if (error) {
            res.status(400);
            res.send(error);
        } else {
            res.json(patient);
        }

    });
});

module.exports = router;
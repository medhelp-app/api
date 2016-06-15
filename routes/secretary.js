var express = require('express');
var router = express.Router();
var multer = require('multer');

var jwt = require('jsonwebtoken');

var UserController = require('../controllers/user');
var userController = new UserController();

router.route('/').get(function (req, res) {
    userController.listSecretary(function (users, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(users);
        }
    });
});
router.route('/name/:name').get(function (req, res) {
    userController.findNameSecretary(req.params.name, function (users, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(users);
        }
    });
});
router.route('/').post(function (req, res) {
    userController.insertSecretary(req.body, function (user, error) {
        if (error) {
            res.status(400);
            res.send(error);
        } else {
            res.json(user);
        }
    });
});
router.route('/:id').delete(function (req, res) {
    userController.deleteSecretary(req.params.id, function (user, error) {
        if (error) {
            res.status(400);
            res.send(error);
        } else {
            res.json(user);
        }
    });
});
router.route('/:id').get(function (req, res) {
    userController.getIdSecretary(req.params.id, function (users, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(users);
        }
    });
});
module.exports = router;

var express = require('express');
var router = express.Router();
var multer = require('multer');

var jwt = require('jsonwebtoken');

var UserController = require('../controllers/user');
var userController = new UserController();



/*---Secretary---*/
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
router.route('/:name').get(function (req, res) {
    userController.findNameSecretary(req.params.name, function (users, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(users);
        }
    });
});
module.exports = router;

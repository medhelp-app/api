var express = require('express');
var router = express.Router();
var multer = require('multer');

var jwt = require('jsonwebtoken');

var UserController = require('../controllers/user');
var userController = new UserController();

var AppointmentController = require('../controllers/appointment');
var appointmentController = new AppointmentController();

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
router.route('/doctor/:id').get(function (req, res) {
    userController.getByDoctor(req.params.id, function (users, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(users);
        }
    });
});

router.route('/:id/appointments').get(function (req, res) {
    appointmentController.getSecretary(req.params.id, function (result, error) {
        if(error){
            res.status(404);
            res.send(error);
        }else{
            res.status(200);
            res.json(result);
        }
    })
});

router.route('/:id/appointments/accept').get(function (req, res) {
    appointmentController.accept(req.params.id, function (result, error) {
        if(error){
            res.status(404);
            res.send(error);
        }else{
            res.status(200);
            res.json(result);
        }
    })
});

router.route('/:id/appointments').delete(function (req, res) {
    appointmentController.remove(req.params.id, function (result, error) {
        if(error){
            res.status(404);
            res.send(error);
        }else{
            res.status(200);
            res.json(result);
        }
    })
});

module.exports = router;

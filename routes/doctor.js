var express = require('express');
var router = express.Router();

var DoctorController = require('../controllers/doctor');
var doctorController = new DoctorController();

router.route('/').get(function (req, res) {
    doctorController.getAll(function (doctors, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(doctors);
        }
    });
});

module.exports = router;
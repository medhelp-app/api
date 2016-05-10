var express = require('express');
var router = express.Router();

var PatientController = require('../controllers/patient');
var patientController = new PatientController();

router.route('/').get(function (req, res) {
    patientController.getAll(function (patients, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(patients);
        }
    });
});
module.exports = router;
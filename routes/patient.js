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

router.route('/:id').get(function (req, res) {
    patientController.getForId(req.params.id,function (userFull, error) {
        if(error){
            res.status(404);
            res.send(error);
        }else{
            res.status(200);
            res.json(userFull);
        }
    })
})

router.route('/:id').put(function (req, res) {
    patientController.update(req.params.id, req.body, function (patient, error) {
        if (error) {
            res.status(400);
            res.send(error);
        } else {
            res.json(patient);
        }

    });
});

module.exports = router;
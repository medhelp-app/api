var express = require('express');
var router = express.Router();
var multer = require('multer');

var RecordController = require('../controllers/record');
var recordController = new RecordController();

router.route('/:patientId').post(function (req, res) {
    recordController.insert(req.params.patientId, req.body, function (records, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(records);
        }
    });
});

router.route('/patient/:patientId').get(function (req, res) {
    recordController.getPatient(req.params.patientId, function (records, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(records);
        }
    });
});

router.route('/doctor/:doctorId').get(function (req, res) {
    recordController.getDoctor(req.params.doctorId, function (records, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(records);
        }
    });
});

router.route('/:id').delete(function (req, res) {
    recordController.delete(req.params.id, function (result, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(result);
        }
    });
});

router.route('/:id').get(function (req, res) {
    archiveController.get(req.params.id, function (result, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;
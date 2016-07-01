var express = require('express');
var router = express.Router();
var multer = require('multer');

var PatientController = require('../controllers/patient');
var patientController = new PatientController();

var PrescriptionController = require('../controllers/prescription');
var prescription = new PrescriptionController();

var UserController = require('../controllers/user');
var userController = new UserController();

var AppointmentController = require('../controllers/appointment');
var appointmentController = new AppointmentController();

var AlertMecicinesController = require('../controllers/alertMedicines');
var alertMedicinesController = new AlertMecicinesController();

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

router.route('/:id/image').get(function (req,res) {
    patientController.getForIdImage(req.params.id,function (image, error) {
        if(error){
            res.status(404);
            res.send(error);
        }else{
            res.status(200);
            res.json(image);
        }
    })
});

/*----------------bodyPart-------------------*/
router.route('/:id/bodyparts').get(function (req, res) {
    patientController.getBodyPartById(req.params.id,function (bodyParts, error) {
        if(error){
            res.status(404);
            res.send(error);
        }else{
            res.status(200);
            res.json(bodyParts);
        }
    })
})

router.route('/:id/bodyparts/:part').get(function (req, res) {
    patientController.getProblemsByPart(req.params.id, req.params.part,function (problems, error) {
        if(error){
            res.status(404);
            res.send(error);
        }else{
            res.status(200);
            res.json(problems);
        }
    })
})

router.route('/:id/bodyparts').post(function (req, res) {
    patientController.insertProblem(req.params.id, req.body, function (problem, error) {
        if (error) {
            res.status(400);
            res.send(error);
        } else {
            res.json(problem);
        }

    });
});

router.route('/:id/bodyparts/prob').put(function (req, res) {
    patientController.updateProblem(req.params.id, req.body, function (patient, error) {
        if (error) {
            res.status(400);
            res.send(error);
        } else {
            res.json(patient);
        }

    });
});
/*--- Routes Prescription--*/
router.route('/:idPatient/prescriptions').get(function (req,res) {
    prescription.prescriptionGetAll(req.params.idPatient,function (prescriptions, error) {
        if(error){
            res.status(404);
            res.send(error);
        }else{
            res.status(200);
            res.json(prescriptions);
        }
    })
});
router.route('/:idPatient/prescriptions/:idPrescription').get(function (req,res) {
    prescription.prescriptionGetId(req.params.idPatient,req.params.idPrescription,function (prescriptions, error) {
        if(error){
            res.status(404);
            res.send(error);
        }else{
            res.status(200);
            res.json(prescriptions);
        }
    })
});
router.route('/:idPatient/prescriptions').post(function (req, res) {
    prescription.prescriptionInsert(req.params.idPatient, req.body, function (result, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(result);
        }

    });
});

router.route('/:idPatient/prescriptions/:idPrescription').put(function (req, res) {
    prescription.prescriptionUpdate(req.params.idPatient,req.params.idPrescription, req.body, function (result, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(result);
        }

    });
});
/*--- END Routes Prescription--*/

/* --- ROTAS APPOINTMENTS --- */
router.route('/:id/appointments').get(function (req, res) {
    appointmentController.getPatients(req.params.id, function (result, error) {
        if(error){
            res.status(404);
            res.send(error);
        }else{
            res.status(200);
            res.json(result);
        }
    })
});
/* --- ROTAS APPOINTMENTS --- */
/*--- ROTAS ALERTMEDICINES ---*/
router.route('/:id/alertMedicines').get(function (req, res) {
    alertMedicinesController.getAll(req.params.id,function (alert, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(alert);
        }
    });
});
router.route('/alertMedicines/:id').get(function (req, res) {
    alertMedicinesController.getForId(req.params.id,function (alert, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(alert);
        }
    });
});
router.route('/:id/alertMedicines').post(function (req, res) {
    alertMedicinesController.insert(req.params.id,req.body, function (result, error) {
        if (error) {
            res.status(400);
            res.send(error);
        } else {
            res.json(result);
        }
    });
});
router.route('/alertMedicines/:id').put(function (req, res) {
    alertMedicinesController.update(req.params.id,req.body, function (result, error) {
        if (error) {
            res.status(400);
            res.send(error);
        } else {
            res.json(result);
        }
    });
});
router.route('/alertMedicines/:id').delete(function (req, res) {
    alertMedicinesController.excluir(req.params.id, function (result, error) {
        if (error) {
            res.status(400);
            res.send(error);
        } else {
            res.json(result);
        }
    });
});
/*--- END ROTAS ALERTMEDICINES--*/
module.exports = router;
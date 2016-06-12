var express = require('express');
var router = express.Router();
var multer = require('multer');

var DoctorController = require('../controllers/doctor');
var doctorController = new DoctorController();

var AvailabilityDoctorController = require('../controllers/availabilityDoctor');
var availabilityDoctorController  = new AvailabilityDoctorController();

var AppointmentController = require('../controllers/appointment');
var appointmentController = new AppointmentController();

var UserController = require('../controllers/user');
var userController = new UserController();

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

router.route('/find/suggestions').get(function (req, res) {
	userController.findDoctors(function (names, error) {
		if (error) {
			res.status(404).send(error);
		} else {
			doctorController.findSpeciality(function (speciality, error) {
				res.json(names.concat(speciality));	
			})
		}
	});
});

router.route('/find/:name').get(function (req, res) {
	doctorController.findName(req.params.name, function (doctors, error) {
		if (error) {
			res.status(404).send(error);
		} else {
			res.json(doctors);
		}
	});
});

router.route('/:id').get(function (req, res) {
	doctorController.getForId(req.params.id,function (userFull, error) {
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
	doctorController.update(req.params.id, req.body, function (doctor, error) {
		if (error) {
			res.status(400);
			res.send(error);
		} else {
			res.json(doctor);
		}

	});
});

router.route('/:id/image').put(multer({dest: './uploads/'}).single('profileImage'),function (req, res) {
    doctorController.updateImage(req.params.id, req.file, function (image, error) {
        if (error) {
            res.status(400);
            res.send(error);
        } else {
            res.json(image);
        }

    });
});

router.route('/:id/image').get(function (req,res) {
    doctorController.getForIdImage(req.params.id,function (image, error) {
        if(error){
            res.status(404);
            res.send(error);
        }else{
            res.status(200);
            res.json(image);
        }
    })
});

/*----------------opinion-------------------*/
router.route('/:id/opinions').post(function (req, res) {
    doctorController.insertOpinion(req.params.id, req.body, function (opinion, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
        	res.status(200);
            res.json(opinion);
        }
    });
});

router.route('/:id/opinions').get(function (req, res) {
	doctorController.getAllOpinionsById(req.params.id, function (opinion, error) {
		if(error){
            res.status(404);
            res.send(error);
        }else{
            res.status(200);
            res.json(opinion);
        }
	});
});

router.route('/:id/opinions/summary').get(function (req, res) {
	doctorController.getSummaryRatings(req.params.id, function (opinion, error) {
		if(error){
            res.status(404);
            res.send(error);
        }else{
            res.status(200);
            res.json(opinion);
        }
	});
});

/*---Routes of AvailabilityDoctor--*/
// informa o id do doctor, retorna array de availabilityDoctor
router.route('/:id/availability').get(function (req,res) {
	availabilityDoctorController.getAllAvailability(req.params.id,function (availability, error) {
		if(error){
			res.status(404);
			res.send(error);
		}else{
			res.status(200);
			res.json(availability);
		}
	})
});

// informa o id da availabilityDoctor, retorna um availabilityDoctor
router.route('/availability/:id').get(function (req,res) {
	availabilityDoctorController.getAvailability(req.params.id,function (availability, error) {
		if(error){
			res.status(404);
			res.send(error);
		}else{
			res.status(200);
			res.json(availability);
		}
	})
});

// informa o id do doctor e no body(weekday,startHour,endHour) para cadastrar um availabilityDoctore
//weekday pode receber uma das seguintes Strings ['sunday', 'monday','tuesday','wednesday', 'thursday','friday','saturday']
//O formato para startHour e endHour é hh:mm
router.route('/:id/availability').post(function (req,res) {
	availabilityDoctorController.insertAvailability(req.params.id, req.body,function (availability, error) {
		if(error){
			res.status(404);
			res.send(error);
		}else{
			res.status(200);
			res.json(availability);
		}
	})
});

//informa o id da availabilityDoctor para atualizar
// paramentros: {weekday: '', startHour:'', endHour:''}
router.route('/availability/:id').put(function (req,res) {
	availabilityDoctorController.updateAvailability(req.params.id,req.body,function (result, error) {
		if(error){
			res.status(404);
			res.send(error);
		}else{
			res.status(200);
			res.json(result);
		}
	})
});

//informa o id da availabilityDoctor para remover
router.route('/availability/:id').delete(function (req,res) {
	availabilityDoctorController.removeAvailability(req.params.id,function (result, error) {
		if(error){
			res.status(404);
			res.send(error);
		}else{
			res.status(200);
			res.json(result);
		}
	})
});


/*---End Routes of AvailabilityDoctor--*/

/* --- ROTAS APPOINTMENTS --- */

router.route('/:id/appointments').post(function (req, res) {
	appointmentController.insert(req.params.id, req.body, function (result, error) {
		if(error){
			res.status(404);
			res.send(error);
		}else{
			res.status(200);
			res.json(result);
		}
	})
});

router.route('/:id/appointments').get(function (req, res) {
	appointmentController.getDoctors(req.params.id, function (result, error) {
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
/*--- HealthInsurance--*/
router.route('/:id/healthInsurance').post(function (req, res) {
	doctorController.insertHealthInsurance(req.params.id, req.body,function (result, error) {
		if(error){
			res.status(404);
			res.send(error);
		}else{
			res.status(200);
			res.json(result);
		}
	})
});
router.route('/:id/healthInsurance').get(function (req, res) {
	doctorController.getHealthInsurance(req.params.id,function (result, error) {
		if(error){
			res.status(404);
			res.send(error);
		}else{
			res.status(200);
			res.json(result);
		}
	})
});
router.route('/:idDoctor/healthInsurance/:id').delete(function (req, res) {
	doctorController.deleteHealthInsurance(req.params.idDoctor, req.params.id,function (result, error) {
		if(error){
			res.status(404);
			res.send(error);
		}else{
			res.status(200);
			res.json(result);
		}
	})
});
/*---END HealthInsurance--*/
module.exports = router;
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

router.route('/find').get(function (req, res) {
	doctorController.getAll(function (doctors, error) {
		if (error) {
			res.status(404).send(error);
		} else {
			var address = [];
			for (var i = 0; i < doctors.length; i++) {
				address.push({
					id: doctors[i].id,
					addressStreet: doctors[i].addressStreet,
				    addressNumber: doctors[i].addressNumber,
				    city: doctors[i].city,
				    state: doctors[i].state,
				    zipCode: doctors[i].zipCode,
				    country: doctors[i].country,
				});
			};

			res.json(address);
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
module.exports = router;
var express = require('express');
var router = express.Router();
var multer = require('multer');

var DoctorController = require('../controllers/doctor');
var doctorController = new DoctorController();

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

module.exports = router;
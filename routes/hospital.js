var express = require('express');
var router = express.Router();

var HospitalController = require('../controllers/hospital');
var hospitalController = new HospitalController();

router.route('/search/:name').get(function (req, res) {
	hospitalController.getName(req.params.name,function (hospitals, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(hospitals);
		}
	});
});

router.route('/:state').get(function (req, res) {
	hospitalController.getState(req.params.state,function (hospitals, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(hospitals);
		}
	});
});

router.route('/:state/:city').get(function (req, res) {
	hospitalController.getCity(req.params.state,req.params.city,function (hospitals, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(hospitals);
		}
	});
});

router.route('/:state/:city/:district').get(function (req, res) {
	hospitalController.getDistrict(req.params.state,req.params.city,req.params.district,function (hospitals, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(hospitals);
		}
	});
});

router.route('/').get(function (req, res) {
	hospitalController.getAll(function (hospitals, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(hospitals);
		}
	});
});

module.exports = router;
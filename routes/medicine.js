var express = require('express');
var router = express.Router();

var MedicineController = require('../controllers/medicine');
var medicineController = new MedicineController();

router.route('/search/:name').get(function (req, res) {
	medicineController.getName(req.params.name,function (medicines, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(medicines);
		}
	});
});

router.route('/search/company/:name').get(function (req, res) {
	medicineController.getCompanyName(req.params.name,function (medicines, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(medicines);
		}
	});
});

router.route('/company').get(function (req, res) {
	medicineController.getCompany(function (medicines, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(medicines);
		}
	});
});

router.route('/:id').get(function (req, res) {
	medicineController.get(req.params.id,function (medicines, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(medicines);
		}
	});
});

router.route('/').get(function (req, res) {
	medicineController.getAll(function (medicines, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(medicines);
		}
	});
});

module.exports = router;
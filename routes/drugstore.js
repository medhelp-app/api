var express = require('express');
var router = express.Router();

var DrugstoreController = require('../controllers/drugstore');
var drugstoreController = new DrugstoreController();

router.route('/search/:name').get(function (req, res) {
	drugstoreController.getName(req.params.name,function (drugstores, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(drugstores);
		}
	});
});

router.route('/:state').get(function (req, res) {
	drugstoreController.getState(req.params.state,function (drugstores, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(drugstores);
		}
	});
});

router.route('/:state/:city').get(function (req, res) {
	drugstoreController.getCity(req.params.state,req.params.city,function (drugstores, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(drugstores);
		}
	});
});

router.route('/:state/:city/:district').get(function (req, res) {
	drugstoreController.getDistrict(req.params.state,req.params.city,req.params.district,function (drugstores, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(drugstores);
		}
	});
});


router.route('/').get(function (req, res) {
	drugstoreController.getAll(function (drugstores, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(drugstores);
		}
	});
});

module.exports = router;
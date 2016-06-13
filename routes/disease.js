var express = require('express');
var router = express.Router();

var DiseaseController = require('../controllers/disease');
var diseaseController = new DiseaseController();

router.route('/:disease').get(function (req, res) {
	diseaseController.getName(req.params.disease,function (diseases, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(diseases);
		}
	});
});

router.route('/').get(function (req, res) {
	diseaseController.getAll(function (diseases, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(diseases);
		}
	});
});

module.exports = router;
var express = require('express');
var router = express.Router();

var PublicationController = require('../controllers/publication');
var publicationController = new PublicationController();

router.route('/').post(function (req, res) {
	publicationController.insert(req.body,function (publications, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(publications);
		}
	});
});

router.route('/').get(function (req, res) {
	publicationController.getAll(function (publications, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(publications);
		}
	});
});

router.route('/:id').delete(function (req, res) {
	publicationController.delete(req.params.id, function (publication, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(publication);
		}
	});
});

router.route('/:id').put(function (req, res) {
	publicationController.update(req.params.id, req.body, function (publication, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(publication);
		}
	});
});

module.exports = router;
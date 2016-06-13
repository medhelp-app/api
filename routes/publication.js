var express = require('express');
var router = express.Router();

var PublicationController = require('../controllers/publication');
var publicationController = new PublicationController();

var VoteController = require('../controllers/vote');
var voteController = new VoteController();

var CommentController = require('../controllers/comment');
var commentController = new CommentController();

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

/*-------------------------Vote in Publication-------------------------------*/

router.route('/:idPublication/vote').post(function (req, res) {
	voteController.insert(req.params.idPublication, req.body,function (vote, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(vote);
		}
	});
});

router.route('/vote/:idPublication/:idUser').delete(function (req, res) {
	voteController.delete(req.params.idPublication, req.params.idUser, function (vote, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(vote);
		}
	});
});

/*-------------------------Comment in Publication-------------------------------*/

router.route('/:idPublication/comment').post(function (req, res) {
	commentController.insert(req.params.idPublication, req.body,function (comment, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(comment);
		}
	});
});

router.route('/:idPublication/comment').get(function (req, res) {
	commentController.getPublication(req.params.idPublication, function (comment, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(comment);
		}
	});
});

router.route('/comment/:idPublication/:idUser').delete(function (req, res) {
	commentController.delete(req.params.idPublication, req.params.idUser, function (comment, error) {
		if (error) {
			res.status(404);
			res.send(error);
		} else {
			res.json(comment);
		}
	});
});

module.exports = router;
var express = require('express');
var router = express.Router();
var multer = require('multer');

var ArchiveController = require('../controllers/archive');
var archiveController = new ArchiveController();

router.route('/:userId').get(function (req, res) {
    archiveController.getForId(req.params.userId, function (archives, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(archives);
        }
    });
});

router.route('/:id').delete(function (req, res) {
    archiveController.delete(req.params.id, req.params.image, function (result, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(result);
        }
    });
});

router.route('/:id/:image').get(function (req, res) {
    archiveController.get(req.params.id, req.params.image, function (result, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(result);
        }
    });
});

router.route('/:userId').post(multer({dest: './uploads/'}).single('archive'),function (req, res) {
    archiveController.insert(req.params.userId, req.file, function (archive, error) {
        if (error) {
            res.status(400);
            res.send(error);
        } else {
            res.json(archive);
        }

    });
});

module.exports = router;
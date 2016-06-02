var express = require('express');
var router = express.Router();
var multer = require('multer');

var ArchiveController = require('../controllers/archive');
var archiveController = new ArchiveController();

router.route('/:id').get(function (req, res) {
    archiveController.getForId(req.params.id, function (archives, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(archives);
        }
    });
});

router.route('/:id/:image').delete(function (req, res) {
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

router.route('/:id').post(multer({
  dest: './uploads/',
  rename: function (fieldname, filename) {
    return fieldname;
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...')
  },
  limits: {
    files: 1
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path)
  }
}).single('profileImage'),function (req, res) {
    archiveController.insert(req.params.id, req.file, function (archive, error) {
        if (error) {
            res.status(400);
            res.send(error);
        } else {
            res.json(archive);
        }

    });
});

module.exports = router;
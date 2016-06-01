var express = require('express');
var router = express.Router();
var multer = require('multer');

var PatientController = require('../controllers/patient');
var patientController = new PatientController();

var UserController = require('../controllers/user');
var userController = new UserController();

router.route('/').get(function (req, res) {
    patientController.getAll(function (patients, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(patients);
        }
    });
});

router.route('/:id').get(function (req, res) {
    patientController.getForId(req.params.id,function (userFull, error) {
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
    patientController.update(req.params.id, req.body, function (patient, error) {
        if (error) {
            res.status(400);
            res.send(error);
        } else {
            res.json(patient);
        }

    });
});

router.route('/:id/image').put(multer({
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
    patientController.updateImage(req.params.id, req.file, function (patient, error) {
        if (error) {
            res.status(400);
            res.send(error);
        } else {
            res.json(patient);
        }

    });
});

router.route('/:id/image').get(function (req,res) {
    var options = {
        root: './image/patients/' + req.params.id + '/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    var fileName = 'profileImage_' + req.params.id + '.png';
    console.log(fileName);
    res.sendFile(fileName, options, function (err) {
        if (err) {
          res.status(404);
          res.send({error:"Imagem não existe"});
        }
        else {
          res.status(200);
          res.send({success: "true"});
        }
    });
});

/*----------------bodyPart-------------------*/
router.route('/:id/bodyparts').get(function (req, res) {
    patientController.getBodyPartById(req.params.id,function (bodyParts, error) {
        if(error){
            res.status(404);
            res.send(error);
        }else{
            res.status(200);
            res.json(bodyParts);
        }
    })
})

router.route('/:id/bodyparts/:part').get(function (req, res) {
    patientController.getProblemsByPart(req.params.id, req.params.part,function (problems, error) {
        if(error){
            res.status(404);
            res.send(error);
        }else{
            res.status(200);
            res.json(problems);
        }
    })
})

router.route('/:id/bodyparts').post(function (req, res) {
    patientController.insertProblem(req.params.id, req.body, function (problem, error) {
        if (error) {
            res.status(400);
            res.send(error);
        } else {
            res.json(problem);
        }

    });
});

router.route('/:id/bodyparts/:idProblem').put(function (req, res) {
    patientController.updateProblem(req.params.id,req.params.idProblem, req.body, function (patient, error) {
        if (error) {
            res.status(400);
            res.send(error);
        } else {
            res.json(patient);
        }

    });
});

module.exports = router;
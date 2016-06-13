var Patient = require('../models/patient');
var UserController = require('../controllers/user');
var Functions = require('../util/functions');
var fs = require('fs');

function PatientController () {
    this.functions = new Functions();

}

PatientController.prototype.getAll = function(callback) {
    Patient.find(function (error, patients) {
        if (error) {
            callback(null, error);
        } else {
            callback(patients);
        }
    });
};

PatientController.prototype.insert = function (_patient, callback) {
    var patient = new Patient();
    patient._id = _patient._id;
    patient.addressStreet = _patient.addressStreet;
    patient.addressNumber = _patient.addressNumber;
    patient.city = _patient.city;
    patient.state = _patient.state;
    patient.zipCode = _patient.zipCode;
    patient.country = _patient.country;
    patient.phone = _patient.phone;
    patient.crm = _patient.crm;

    patient.save(function (error, patient) {
        if (error) {
            callback(null, error);
        } else {
            callback(patient);
        }
    })
}

PatientController.prototype.getForId = function (idUser, callback) {
    var userController = new UserController();

    Patient.findOne({ _id: idUser },function (error, patient) {
        if (error) {
            callback(null, error);
        } else {
            if (patient) {
                userController.getForId(idUser, function (user, error) {
                    if (error) {
                        callback(null, error);
                    } else {
                        console.log(user.profileImage);
                        var userFull = {
                            _id: patient._id,
                            name: user.name,
                            email: user.email,
                            userType: user.userType,
                            profileImage: user.profileImage,
                            addressStreet: patient.addressStreet,
                            addressNumber: patient.addressNumber,
                            city: patient.city,
                            state: patient.state,
                            zipCode: patient.zipCode,
                            country: patient.country,
                            phone: patient.phone,
                            healthInsurance: patient.healthInsurance
                        }

                        callback(userFull);
                    }
                });
            } else {
                callback({ error : "Paciente não existente." });
            }
        }
    })
};

PatientController.prototype.getForIdImage = function (idUser, callback) {
    var userController = new UserController();

    Patient.findOne({ _id: idUser },function (error, patient) {
        if (error) {
            callback(null, error);
        } else {
            if (patient) {
                userController.getForId(idUser, function (user, error) {
                    if (error) {
                        callback(null, error);
                    } else {
                        var image = {
                            profileImage: patient.profileImage
                        };
                        callback(image);
                    }
                });
            } else {
                callback({ error : "Paciente não existente." });
            }
        }
    })
};

PatientController.prototype.update = function (id, _patient, callback) {
    var userController = new UserController();
    var functions = this.functions;

    userController.getForId(id, function (user, error) {
        if (error) {
            callback({error: 'Id inválido.'});
        } else {
            if (_patient.email === '' || _patient.name === '') {
                callback({ error : "O campo 'nome' e 'e-mail' são obrigatórios." });
            } else {
                if (functions.validateEmail(_patient.email)) {
                    var userUpdate = {
                        name: _patient.name,
                        email: _patient.email
                    };

                    var patientUpdate = {
                        addressStreet :_patient.addressStreet,
                        addressNumber : _patient.addressNumber,
                        city : _patient.city,
                        state : _patient.state,
                        zipCode : _patient.zipCode,
                        country : _patient.country,
                        phone : _patient.phone,
                        healthInsurance: _patient.healthInsurance
                    };

                    if (user.email === _patient.email) {
                        userController.update(id, userUpdate, function (status, error) {
                            if (error) {
                                callback(error);
                            } else {
                                Patient.update({ _id: id }, { $set: patientUpdate }, { upsert: true }, function (error, status) {
                                    if (error) {
                                        callback(error);
                                    } else {
                                        callback({ sucess: "ok" });
                                    }
                                });
                            }
                        });
                    } else {
                        userController.getEmail(_patient.email, function (users, erros) {
                            if (erros) {
                                callback(erros);
                            } else {
                                if (users.length === 0) {
                                    userController.update(id, userUpdate, function (status, error) {
                                        if (error) {
                                            callback(error);
                                        } else {
                                            Patient.update({ _id: id }, { $set: patientUpdate }, {upsert: true }, function (error, status) {
                                                if (error) {
                                                    callback(error);
                                                } else {
                                                    callback({ sucess: "ok" });
                                                };
                                            });
                                        };
                                    });
                                } else {
                                    callback({ error : 'E-mail já existente.' });
                                };
                            };
                        });
                    };
                } else {
                    callback({ error: 'E-mail inválido.' });
                };
            }
        };
    });
};

PatientController.prototype.updateImage = function (id, _image, callback) {
    var userController = new UserController();
    var functions = this.functions;
    userController.getForId(id, function (user, error) {
        if (error) {
            callback({error: 'Id inválido.'});
        } else {
            fs.readFile('./uploads/'+_image.filename, function (error, data) {
                data = new Buffer(data).toString('base64');
                if(error){
                    callback(null,error);
                }
                else{
                    Patient.update({ _id: id }, { $set: {profileImage:data} }, { upsert: true }, function (error, status) {
                        if (error) {
                            fs.unlink('./uploads/'+_image.filename);
                            callback(error);
                        } else {
                            fs.unlink('./uploads/'+_image.filename);
                            callback({ sucess: "ok" });
                        }
                    });
                }     
            });             
        };
    });
};

PatientController.prototype.delete = function(id, callback) {
    User.remove({ _id: id }, function (error) {
        if (error) {
            callback(null, { error: 'ID inválido.' });
        } else {
            Patient.remove({_id: id},function (error, user) {
                if(error){
                    callback(null, error);
                }else{
                    callback({ message: 'Removido com sucesso.' });
                }
            })
        }
    });
};

/* --------------------------bodyPart--------------------------------*/
PatientController.prototype.getBodyPartById = function (idUser, callback) {
    Patient.findOne({ _id: idUser },function (error, patient) {
        if (error) {
            callback(null, error);
        } else {
            if (patient) {
                callback(patient.bodyPart)
            } else {
                callback({ error : "Paciente não existente." });
            }
        }
    })
};

PatientController.prototype.insertProblem = function (idUser,_problem, callback) {
    Patient.findOne({ _id: idUser },function (error, patient) {
        if (error) {
            callback(null, error);
        } else {
            if (patient) {
                var problem = {
                    problem: _problem.problem,
                    description: _problem.description,
                    severity: _problem.severity,
                    occurredDate : _problem.occurredDate,
                    resolved: _problem.resolved
                }
                if(_problem.part === 'rightArm'){
                    patient.bodyPart[0].problems.push(problem);
                    patient.save(function (error) {
                        if(error){
                            callback({ success : "false" })
                        }else{
                            callback({ success: "true" })
                        }
                    })
                }else if(_problem.part === 'leftArm'){
                    patient.bodyPart[1].problems.push(problem);
                    patient.save(function (error) {
                        if(error){
                            callback({ success : "false" })
                        }else{
                            callback({ success: "true" })
                        }
                    })
                }else if(_problem.part === 'rightLeg'){
                    patient.bodyPart[2].problems.push(problem);
                    patient.save(function (error) {
                        if(error){
                            callback({ success : "false" })
                        }else{
                            callback({ success: "true" })
                        }
                    })
                }else if(_problem.part === 'leftLeg'){
                    patient.bodyPart[3].problems.push(problem);
                    patient.save(function (error) {
                        if(error){
                            callback({ success : "false" })
                        }else{
                            callback({ success: "true" })
                        }
                    })
                }else if(_problem.part === 'stomach'){
                    patient.bodyPart[4].problems.push(problem);
                    patient.save(function (error) {
                        if(error){
                            callback({ success : "false" })
                        }else{
                            callback({ success: "true" })
                        }
                    })
                }else if(_problem.part === 'chest'){
                    patient.bodyPart[5].problems.push(problem);
                    patient.save(function (error) {
                        if(error){
                            callback({ success : "false" })
                        }else{
                            callback({ success: "true" })
                        }
                    })
                }else if(_problem.part === 'head'){
                    patient.bodyPart[6].problems.push(problem);
                    patient.save(function (error) {
                        if(error){
                            callback({ success : "false" })
                        }else{
                            callback({ success: "true" })
                        }
                    })
                }else{
                    callback({ error : "false" });
                }
            } else {
                callback({ error : "Paciente não existente." });
            }
        }
    })
}

PatientController.prototype.getProblemsByPart = function (idUser, part, callback) {
    Patient.find({_id: idUser},{ bodyPart: { $elemMatch: { part: part } }},function (error, patient) {
        if(error){
            callback(error)
        }else{
            if(patient.length===0){
                callback({ error : "Paciente não existene." })
            }else{
                if(patient[0].bodyPart.length===0){
                    callback({ error : "Parte do corpo não existente." })
                }else {
                    callback(patient[0].bodyPart[0].problems)
                }
            }

        }
    })
};
PatientController.prototype.updateProblem = function (idUser,idProblem,_problem, callback) {
    Patient.findOne({_id: idUser},{ bodyPart: { $elemMatch: { part: _problem.part } }} , function (error, patient) {
        if (error) {
            callback(error)
        } else {
            var tam = patient.bodyPart[0].problems.length;
            var problems = patient.bodyPart[0].problems;
            var encontrou = false;
            for(var i = 0; i<tam; i++){
                if(idProblem == patient.bodyPart[0].problems[i]._id) {
                    problems[i].problem = _problem.problem;
                    problems[i].description = _problem.description;
                    problems[i].severity = _problem.severity;
                    problems[i].occurredDate = _problem.occurredDate;
                    problems[i].resolved = _problem.resolved;
                    encontrou = true;
                    break;
                }
            }
            if(encontrou){
                Patient.update({ _id: idUser, "bodyPart.part":_problem.part}, { $set: {"bodyPart.$.problems": problems} }, { upsert: false }, function (error, status) {
                    if(error){
                        callback(error)
                    }else{
                        callback({ success: "true" })
                    }
                })
            }else{
                callback({ error : "Paciente não existene." })
            }
        }
    })
}

module.exports = PatientController;
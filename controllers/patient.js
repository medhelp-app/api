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

                    Patient.findOne({ _id: id }, function (error, patientUpdate) {
                        patientUpdate.addressStreet = _patient.addressStreet;
                        patientUpdate.addressNumber =  _patient.addressNumber;
                        patientUpdate.city =  _patient.city;
                        patientUpdate.state =  _patient.state;
                        patientUpdate.zipCode =  _patient.zipCode;
                        patientUpdate.country =  _patient.country;
                        patientUpdate.phone =  _patient.phone;
                        patientUpdate.healthInsurance = _patient.healthInsurance ? _patient.healthInsurance : '';

                        if (user.email === _patient.email) {
                            userController.update(id, userUpdate, function (error) {
                                if (error) {
                                    callback(error);
                                } else {
                                    patientUpdate.save(function (error) {
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
                                        userController.update(id, userUpdate, function (error) {
                                            if (error) {
                                                callback(error);
                                            } else {
                                                patientUpdate.save(function (error) {
                                                    if (error) {
                                                        callback(error);
                                                    } else {
                                                        callback({ sucess: "ok" });
                                                    }
                                                });
                                            };
                                        });
                                    } else {
                                        callback({ error : 'E-mail já existente.' });
                                    };
                                };
                            });
                        };
                    })
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
                } else {
                    Patient.findOn({ _id: id }, function (error, patient) {
                        patient.profileImage = data;
                        patient.save(function (error) {
                            if (error) {
                                fs.unlink('./uploads/'+_image.filename);
                                callback(error);
                            } else {
                                fs.unlink('./uploads/'+_image.filename);
                                callback({ sucess: "ok" });
                            }
                        })
                    })
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
                    local:_problem.local,
                    problem: _problem.problem,
                    description: _problem.description,
                    severity: _problem.severity,
                    occurredDate : _problem.occurredDate,
                    resolved: _problem.resolved
                }
                if(_problem.part === 'rightArm'){

                    if(_problem.subpart === 'hand'){ 
                      patient.bodyPart[0].problems.push(problem);  
                    }else if(_problem.subpart === 'forearm'){
                      patient.bodyPart[1].problems.push(problem);  
                    }else if(_problem.subpart === 'elbow'){
                      patient.bodyPart[2].problems.push(problem);
                    }else if(_problem.subpart === 'arm'){
                      patient.bodyPart[3].problems.push(problem);      
                    }
                    
                    patient.save(function (error) {
                        if(error){
                            callback({ success : "false" })
                        }else{
                            callback({ success: "true" })
                        }
                    })
                }else if(_problem.part === 'leftArm'){

                    if(_problem.subpart === 'hand'){ 
                      patient.bodyPart[4].problems.push(problem);  
                    }else if(_problem.subpart === 'forearm'){
                      patient.bodyPart[5].problems.push(problem);  
                    }else if(_problem.subpart === 'elbow'){
                      patient.bodyPart[6].problems.push(problem);
                    }else if(_problem.subpart === 'arm'){
                      patient.bodyPart[7].problems.push(problem);      
                    }

                    patient.save(function (error) {
                        if(error){
                            callback({ success : "false" })
                        }else{
                            callback({ success: "true" })
                        }
                    })
                }else if(_problem.part === 'rightLeg'){

                    if(_problem.subpart === 'foot'){ 
                      patient.bodyPart[8].problems.push(problem);  
                    }else if(_problem.subpart === 'leg'){
                      patient.bodyPart[9].problems.push(problem);  
                    }else if(_problem.subpart === 'thigh'){
                      patient.bodyPart[10].problems.push(problem);
                    }else if(_problem.subpart === 'knee'){
                      patient.bodyPart[11].problems.push(problem);      
                    }

                    patient.save(function (error) {
                        if(error){
                            callback({ success : "false" })
                        }else{
                            callback({ success: "true" })
                        }
                    })
                }else if(_problem.part === 'leftLeg'){

                    if(_problem.subpart === 'foot'){ 
                      patient.bodyPart[12].problems.push(problem);  
                    }else if(_problem.subpart === 'leg'){
                      patient.bodyPart[13].problems.push(problem);  
                    }else if(_problem.subpart === 'thigh'){
                      patient.bodyPart[14].problems.push(problem);
                    }else if(_problem.subpart === 'knee'){
                      patient.bodyPart[15].problems.push(problem);      
                    }

                    patient.save(function (error) {
                        if(error){
                            callback({ success : "false" })
                        }else{
                            callback({ success: "true" })
                        }
                    })
                }else if(_problem.part === 'trunk'){

                    if(_problem.subpart === 'thorax'){ 
                      patient.bodyPart[16].problems.push(problem);  
                    }else if(_problem.subpart === 'loin'){
                      patient.bodyPart[17].problems.push(problem);  
                    }else if(_problem.subpart === 'abdomen'){
                      patient.bodyPart[18].problems.push(problem);
                    }

                    patient.save(function (error) {
                        if(error){
                            callback({ success : "false" })
                        }else{
                            callback({ success: "true" })
                        }
                    })

                }else if(_problem.part === 'head'){

                    if(_problem.subpart === 'face'){ 
                      patient.bodyPart[19].problems.push(problem);  
                    }else if(_problem.subpart === 'head'){
                      patient.bodyPart[20].problems.push(problem);  
                    }

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
            callback(error);
        }else{
            if(patient.length===0){
                callback({ error : "Paciente não existene." });
            }else{
                if(patient[0].bodyPart.length===0){
                    callback({ error : "Parte do corpo não existente." });
                }else {
                    callback(patient[0].bodyPart[0].problems);
                }
            }

        }
    })
};
PatientController.prototype.updateProblem = function (idUser,_problem, callback) {
    Patient.findOne({_id: idUser},{ bodyPart: { $elemMatch: { part: _problem.part } }} , function (error, patient) {
        if (error) {
            callback(error);
        } else {
            var tam = patient.bodyPart[0].problems.length;
            var problems = patient.bodyPart[0].problems;
            var encontrou = false;
            for(var i = 0; i<tam; i++){
                if(_problem.id == patient.bodyPart[0].problems[i]._id) {
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
               callback(patient);
            }else{
                callback({ error : "Paciente não existene." });
            }
        }
    });
}

module.exports = PatientController;
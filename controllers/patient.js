var Patient = require('../models/patient');
var UserController = require('../controllers/user');
var Functions = require('../util/functions');

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
                            password: user.password,
                            addressStreet: patient.addressStreet,
                            addressNumber: patient.addressNumber,
                            city: patient.city,
                            state: patient.state,
                            zipCode: patient.zipCode,
                            country: patient.country,
                            phone: patient.phone
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
                        phone : _patient.phone
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

module.exports = PatientController;
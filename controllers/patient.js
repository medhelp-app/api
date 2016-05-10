var Patient = require('../models/patient');

function PatientController () {
    
}

PatientController.prototype.getAll = function(callback) {
    Patient.find(function (error, users) {
        if (error) {
            callback(null, error);
        } else {
            callback(users);
        }
    });
};

PatientController.prototype.insert = function (_idUser, callback) {
    var patient = new Patient();
    patient.idUser = _idUser;
    patient.save(function (error, _patient) {
        if (error) {
            callback(null, error);
        } else {
            callback(_patient);
        }
    });
}
module.exports = PatientController;
var Doctor = require('../models/doctor');

function DoctorController () {

}

DoctorController.prototype.getAll = function(callback) {
    Doctor.find(function (error, users) {
        if (error) {
            callback(null, error);
        } else {
            callback(users);
        }
    });
};
DoctorController.prototype.insert = function (_idUser, callback) {
    var doctor = new Doctor();
    doctor.idUser = _idUser;
    doctor.save(function (error, _doctor) {
        if (error) {
            callback(null, error);
        } else {
            callback(_doctor);
        }
    });
}
module.exports = DoctorController;
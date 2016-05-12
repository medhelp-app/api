var Patient = require('../models/patient');
var UserController = require('../controllers/user');


function PatientController () {
    
}

var userController = new UserController();

PatientController.prototype.getAll = function(callback) {
    Patient.find(function (error, patients) {
        if (error) {
            callback(null, error);
        } else {
            callback(patients);
        }
    });
};

PatientController.prototype.getForId = function (idUser, callback) {
    Patient.findOne({_id: idUser},function (error, patient) {
        if(error){
            callback(null,error);
        }else{
            if(patient){
                userController.getForId(idUser, function (user, error) {
                    if(error){
                        callback(null, error);
                    }else{
                        var userFull = {
                            _id: patient._id,
                            name: user.name,
                            email: user.email,
                            typeUser: user.enum,
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
                    };
                });
            }else{
                callback({error : "Paciente não existente."});
            }

        }
    })
};

PatientController.prototype.update = function (id, _patient, callback) {
    userController.getForId(id, function (user, error) {
        if(error){
            callback({error: 'Id inválido.'});
        }else {
            var patient = {
                addressStreet :_patient.addressStreet,
                addressNumber : _patient.addressNumber,
                city : _patient.city,
                state : _patient.state,
                zipCode : _patient.zipCode,
                country : _patient.country,
                phone : _patient.phone
            }

            Patient.update({_id:id}, { $set: patient}, {upsert: true}, function (error, patientUpdate) {
               if(error){
                   callback(error);
               } else{
                   callback({ sucess: "ok" })
               }
            });

        };
    });
};
module.exports = PatientController;
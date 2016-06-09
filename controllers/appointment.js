var Appointment = require('../models/appointment');
var Doctor = require('../models/doctor');
var Patient = require('../models/patient');

function AppointmentController() {

}

AppointmentController.prototype.insert = function (_doctorId, body, callback) {
    Doctor.find({_id : _doctorId},function (error, doctor) {
        if (error) {
            callback(error)
        } else {
            if (doctor.length === 0) {
                callback({error: 'Médico não existe'})
            }else{
                var appointment = new Appointment();
                appointment.doctorId = _doctorId;
                appointment.patientId = body.patientId;
                appointment.availabilityId = body.availabilityId;
                appointment.date = body.date;
                appointment.save(function(err, result){
                    if(err){
                        callback(err);
                    }else{
                        callback({success: 'true'})
                    }
                })

            }
        }
    })
}

AppointmentController.prototype.getDoctors = function(_doctorId, callback) {
    Doctor.find({_id : _doctorId},function (error, doctors) {
        if (error) {
            callback(error)
        } else {
            if (doctors.length === 0) {
                callback({error: "Médico não existe."});
            } else {
                Appointment.find({ doctorId : _doctorId}).populate('availabilityId').exec(function (error, availability ) {
                    if (error) {
                        callback(error);
                    } else {
                        callback(availability)
                    }
                });
            }
        }
    })
};

AppointmentController.prototype.getPatients = function(_patientId, callback) {
    Patient.find({_id : _patientId},function (error, doctors) {
        if (error) {
            callback(error)
        } else {
            if (doctors.length === 0) {
                callback({error: "Paciente não existe."});
            } else {
                Appointment.find({ patientId : _patientId }).populate('availabilityId').exec(function (error, availability ) {
                    if (error) {
                        callback(error);
                    } else {
                        callback(availability)
                    }
                });
            }
        }
    })
};

AppointmentController.prototype.remove = function(_id,callback) {
    Appointment.remove({ _id: _id }, function (err) {
        if (err) {
            callback(err)
        } else {
            callback({success: 'true'})
        }
    })
}

module.exports = AppointmentController;


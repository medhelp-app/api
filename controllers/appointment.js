    var Appointment = require('../models/appointment');
var Doctor = require('../models/doctor');
var Patient = require('../models/patient');
var User = require('../models/user');

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
                Appointment.find({ doctorId : _doctorId}).populate('availabilityId').populate('patientId').exec(function (error, availability ) {
                    if (error) {
                        callback(error);
                    } else {
                        var availabilities = [];

                        if (availability.length > 0) {
                            load(0);

                            function load (i) {
                                User.find({ _id: availability[i].patientId }, function (error, user) {
                                    var av = {
                                        "_id": availability[i]._id,
                                        "date": availability[i].date,
                                        "availabilityId": availability[i].availabilityId,
                                        "patientId": availability[i].patientId._id,
                                        "profileImage": availability[i].patientId.profileImage,
                                        "doctorId": availability[i].doctorId,
                                        "user": user[0]
                                    };

                                    availabilities.push(av);
                                    if (i + i < availability.length)
                                        load(i + 1);
                                    else
                                        callback(availabilities);
                                });
                            }
                        } else {
                            callback([]);
                        }
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
                Appointment.find({ patientId : _patientId }).populate('availabilityId').populate('doctorId').exec(function (error, availability ) {
                    if (error) {
                        callback(error);
                    } else {
                        var availabilities = [];

                        if (availability.length > 0) {
                            load(0);

                            function load (i) {
                                User.find({ _id: availability[i].doctorId }, function (error, user) {
                                    var av = {
                                        "_id": availability[i]._id,
                                        "date": availability[i].date,
                                        "availabilityId": availability[i].availabilityId,
                                        "patientId": availability[i].patientId._id,
                                        "profileImage": availability[i].doctorId.profileImage,
                                        "doctorId": availability[i].doctorId,
                                        "user": user[0]
                                    };

                                    availabilities.push(av);
                                    if (i + i < availability.length)
                                        load(i + 1);
                                    else
                                        callback(availabilities);
                                });
                            }
                        } else {
                            callback([]);
                        }
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


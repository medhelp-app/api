var Prescription = require('../models/prescription');
var Patient = require('../models/patient');
var Doctor = require('../models/doctor');
function PrescriptionController () {

}

PrescriptionController.prototype.prescriptionGetAll = function(_patientId,callback) {
    Patient.find({_id : _patientId},function (error, patient) {
        if (error) {
            callback(error)
        } else {
            if (patient.length === 0) {
                callback({ error : "Paciente não existe." });
            }else{
                Prescription.find({patientId : _patientId},function (error, prescriptions) {
                    if (error) {
                        callback(null, error);
                    } else {
                        callback(prescriptions);
                    }
                });
            }
        }
    })

};
PrescriptionController.prototype.prescriptionGetId = function(idPatient, prescriptionId ,callback) {
    Patient.find({_id : idPatient},function (error, patient) {
        if (error) {
            callback(error)
        } else {
            if (patient.length === 0) {
                callback({error: "Paciente não existe."});
            } else {
                Prescription.find({_id : prescriptionId},function (error, prescription) {
                    if (error) {
                        callback(null, error);
                    } else {
                        if(prescription.length===0){
                            callback({ error : "Prescrição não existente." })
                        }else{
                            callback(prescription[0]);
                        }

                    }
                });
            }
        }
    })

};


PrescriptionController.prototype.prescriptionInsert = function (_patientId,body, callback) {
    Patient.find({_id : _patientId},function (error, patient) {
        if(error){
            callback(error)
        }else{
            if(patient.length===1){
                Doctor.find({_id : body.doctorId},function (error, doctor) {
                    if (error) {
                        callback(error)
                    } else {
                        if (doctor.length === 1) {
                            var prescription = new Prescription();
                            prescription.patientId = _patientId;
                            prescription.doctorId = body.doctorId;
                            prescription.problem = body.problem;
                            prescription.medicines = body.medicines;
                            prescription.save(function (error, result) {
                                if (error) {
                                    callback(null, error);
                                } else {
                                    callback(result);
                                }
                            })
                        }else{
                            callback({ error : "Doctor não existe." });
                        }
                    }
                })

            }else{
                callback({ error : "Paciente não existe." });
            }
        }
    })

}

PrescriptionController.prototype.prescriptionUpdate = function (_patientId,_prescriptionId,body, callback) {
    Patient.find({_id : _patientId},function (error, patient) {
        if(error){
            callback(error)
        }else{
            if(patient.length===1){
                Doctor.find({_id : body.doctorId},function (error, doctor) {
                    if (error) {
                        callback(error)
                    } else {
                        if (doctor.length === 0) {
                            callback({ error : "Médico não existe." })
                        }else {
                            Prescription.find({_id : _prescriptionId},function (error, prescription) {
                                if (error) {
                                    callback(null, error);
                                } else {
                                    if(prescription.length===0){
                                        callback({ error : "Prescrição não existente." })
                                    }else{
                                        var prescription = {
                                            doctorId : body.doctorId,
                                            problem : body.problem,
                                            medicines : body.medicines
                                        }
                                        Prescription.update({_id:_prescriptionId} , { $set: prescription}, function (err, tank) {
                                            if (err){
                                                callback(err);
                                            }else{
                                                callback(tank);
                                            }
                                        });
                                    }

                                }
                            });
                        }
                    }
                })

            }else{
                callback({ error : "Paciente não existe." });
            }
        }
    })

}

module.exports = PrescriptionController;
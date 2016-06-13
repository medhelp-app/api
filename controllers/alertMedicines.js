var AlertMedicines = require('../models/alertMedicines');
var Patient = require('../models/patient')
function AlertMedicinesController() {
    
}

AlertMedicinesController.prototype.insert = function (idPatient,body,callback) {
    Patient.findById(idPatient, function (err, patient) {
        if(err){
            callback({error: 'Error ao buscar patient!'})
        }else{
            if(patient){
                var alertMedicines = new AlertMedicines();
                alertMedicines.patientId = idPatient;
                alertMedicines.medicines = body.medicines;
                alertMedicines.days = body.days;
                alertMedicines.timeType = body.timeType;
                alertMedicines.timesPerDay = body.timesPerDay;
                alertMedicines.hourAlert = body.hourAlert;
                alertMedicines.startDate = body.startDate;
                alertMedicines.continuous = body.continuous;
                alertMedicines.endDate = body.endDate;
                alertMedicines.nameDoctor = body. nameDoctor;
                alertMedicines.save(function(err,result){
                    if(err){
                        callback({Error: 'Error ao salvar!'})
                    }else{
                        callback({success: 'true'});
                    }
                })

            }else{
                callback({Error: 'Paciente não existe!'})
            }
        }
    })
}
AlertMedicinesController.prototype.getForId = function (id,callback) {
    AlertMedicines.findById(id, function (err, alert) {
        if(err){
            callback({error: 'Error ao buscar patient!'})
        }else{
            if(alert){
                callback(alert)
            }else{
                callback({Error: 'Paciente não existe!'})
            }
        }
    })
}
AlertMedicinesController.prototype.getAll = function (idPatient,callback) {
    AlertMedicines.find({patientId: idPatient}, function (err, alerts) {
        if(err){
            callback({error: 'Error ao buscar as alertas!'})
        }else{
            callback(alerts)
        }
    })
}
AlertMedicinesController.prototype.update = function (id,body,callback) {
    AlertMedicines.findById(id, function (err, alert) {
        if(err){
            callback({error: 'Error ao buscar alertar!'})
        }else{
            if(alert){
                var alertMedicines = {
                    medicines : body.medicines,
                    days : body.days,
                    timeType : body.timeType,
                    timesPerDay : body.timesPerDay,
                    hourAlert : body.hourAlert,
                    startDate : body.startDate,
                    continuous : body.continuous,
                    endDate : body.endDate,
                    nameDoctor : body. nameDoctor
                }

                AlertMedicines.update({_id : id},{$set : alertMedicines},function (err,result){
                    if(err){
                        callback({Error: 'Error ao salvar!'})
                    }else{
                        callback({success: 'true'});
                    }
                })

            }else{
                callback({Error: 'Alerta não existe!'})
            }
        }
    })
}
AlertMedicinesController.prototype.excluir = function (id,callback) {
    AlertMedicines.remove({ _id: id }, function (err) {
        if (err) {
            callback({Error: 'Error ao excluir!'})
        } else {
            callback({success: 'true'})
        }
    })
}

module.exports = AlertMedicinesController;
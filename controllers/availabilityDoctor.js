var AvailabilityDoctor = require('../models/availabilityDoctor');
var Doctor = require('../models/doctor');

function AvailabilityDoctorController() {

}

AvailabilityDoctorController.prototype.insertAvailability = function (_doctorId,body,callback) {
    Doctor.find({_id : _doctorId},function (error, doctor) {
        if (error) {
            callback(error)
        } else {
            if (doctor.length === 0) {
                callback({error: 'Médico não existe'})
            }else{
                var availabilityDoctor = new AvailabilityDoctor();
                availabilityDoctor.doctorId = _doctorId;
                availabilityDoctor.weekday = body.weekday;
                availabilityDoctor.startHour = body.startHour;
                availabilityDoctor.endHour = body.endHour;
                availabilityDoctor.save(function(err, result){
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

AvailabilityDoctorController.prototype.getAllAvailability = function(_doctorId,callback) {
    Doctor.find({_id : _doctorId},function (error, doctors) {
        if (error) {
            callback(error)
        } else {
            if (doctors.length === 0) {
                callback({error: "Médico não existe."});
            } else {
                AvailabilityDoctor.find({ doctorId : _doctorId},function (error, availability ) {
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
AvailabilityDoctorController.prototype.getAvailability = function(_id,callback) {
    AvailabilityDoctor.findById(_id,function (error, availability ) {
        if (error) {
            callback(error);
        } else {
            if(availability){
                callback(availability)
            }else{
                callback({error: 'Disponibilidade não existe!'})
            }
        }
    });
};
AvailabilityDoctorController.prototype.removeAvailability = function(_id,callback) {

    AvailabilityDoctor.remove({ _id: _id }, function (err) {
        if (err) {
            callback(err)
        } else {
            callback({success: 'true'})
        }
    })
}

AvailabilityDoctorController.prototype.updateAvailability = function(id,body,callback) {
    var availability = {
        weekday : body.weekday,
        startHour : body.startHour,
        endHour : body.endHour
    } 
    AvailabilityDoctor.update({_id : id},{$set : availability},function (err,result) {
        if(err){
            callback(err)
        }else{
            if(result.n===0){
                callback({error: 'Disponibilidade não existe!'})
            }else{
                callback({success: 'true'})
            }

        }
    });
}
module.exports = AvailabilityDoctorController;


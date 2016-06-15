var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppointmentSchema = new Schema({
    patientId :  {
        type : Schema.Types.ObjectId, ref: 'patient'
    },
    doctorId :  {
        type : Schema.Types.ObjectId, ref: 'doctor'
    },
    availabilityId :  {
        type : Schema.Types.ObjectId, ref: 'availabilityDoctor'
    },
    status: Boolean,
    date: Date
}, { toJSON: { getters: true } });

module.exports = mongoose.model('appointment', AppointmentSchema);
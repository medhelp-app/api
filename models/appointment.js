var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppointmentSchema = new Schema({
    patientId :  {
        type : Schema.Types.ObjectId, ref: 'patient',
        get: global.decrypt, 
        set: global.encrypt
    },
    doctorId :  {
        type : Schema.Types.ObjectId, ref: 'doctor',
        get: global.decrypt, 
        set: global.encrypt
    },
    availabilityId :  {
        type : Schema.Types.ObjectId, ref: 'availabilityDoctor',
        get: global.decrypt, 
        set: global.encrypt
    },
    date: Date
}, { toJSON: { getters: true } });

module.exports = mongoose.model('appointment', AppointmentSchema);
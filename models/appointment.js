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
    date: Date
});

AppointmentSchema.plugin(global.encrypt, { encryptionKey: global.encKey, signingKey: global.sigKey });

module.exports = mongoose.model('appointment', AppointmentSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var availabilityDoctorSchema = new Schema({
    doctorId :  {
        type : Schema.Types.ObjectId, ref: 'doctors'
    },
    weekday: {
        type: String,
        enum: ['sunday', 'monday','tuesday','wednesday', 'thursday','friday','saturday']
    },
    startHour: String,
    endHour: String
});

availabilityDoctorSchema.plugin(global.encrypt, { encryptionKey: global.encKey, signingKey: global.sigKey });

module.exports = mongoose.model('availabilityDoctor', availabilityDoctorSchema);
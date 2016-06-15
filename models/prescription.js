var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PrescriptionsSchema = new Schema({
    patientId : {
        type : Schema.Types.ObjectId, ref: 'patients'
    },
    doctorId :  {
        type : Schema.Types.ObjectId, ref: 'doctors'
    },
    problem: {
        type : String,
        get: global.decrypt, 
        set: global.encrypt
    },
    medicines: [{name: String, amount: String, occurence: String, description: String, note: String}]
}, { toJSON: { getters: true } });

module.exports = mongoose.model('prescriptions', PrescriptionsSchema);
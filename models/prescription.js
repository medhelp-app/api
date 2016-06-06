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
        type : String
    },
    medicines: [{name: String, amount: String, occurence: String, description: String, note: String}]
});

module.exports = mongoose.model('prescriptions', PrescriptionsSchema);
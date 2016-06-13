var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatientSchema = new Schema({
    addressStreet :{
        type : String
    },
    addressNumber :{
        type : String
    },
    city :{
        type : String
    },
    state :{
        type : String
    },
    zipCode :{
        type : String
    },
    country :{
        type : String
    },
    phone :{
        type : String
    },
    healthInsurance:{
        type: String
    },
    _id :{
        type: Schema.Types.ObjectId, ref: 'user'
    },
    bodyPart : [{part : String, problems: [{problem: String, description:String, severity: String, occurredDate : Date, resolved: Boolean}]}]
});

module.exports = mongoose.model('patient', PatientSchema);
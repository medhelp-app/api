var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DoctorSchema = new Schema({
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
    crm :{
        type : String
    },
    ufCrm:{
        type : String
    },
    doctorType:{
        type : String
    },
    crmStatus:{
        type : String
    },
    profileImage:{
        type : String
    },
    healthInsurance: [{healthInsurance: String}],
    opinions : [{generalRating : Number, punctualityRating: Number, attentionRating: Number, installationRating: Number, comment : String }]
});

module.exports = mongoose.model('doctor', DoctorSchema);
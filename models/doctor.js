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
    _id :{
        type: Schema.Types.ObjectId, ref: 'user'
    },
    healthInsurance: [{healthInsurance: String}],
    opinions : [{generalRating : Number, punctualityRating: Number, attentionRating: Number, installationRating: Number, comment : String }]
});

DoctorSchema.plugin(global.encrypt, { encryptionKey: global.encKey, signingKey: global.sigKey });

module.exports = mongoose.model('doctor', DoctorSchema);
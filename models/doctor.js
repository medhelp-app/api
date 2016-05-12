/**
 * Created by jerem_000 on 09/05/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DoctorSchema = new Schema({
    addressStreet :{
        type : String,
        required: true
    },
    addressNumber :{
        type : String,
        required: true
    },
    city :{
        type : String,
        required: true
    },
    state :{
        type : String,
        required: true
    },
    zipCode :{
        type : String,
        required: true
    },
    country :{
        type : String,
        required: true
    },
    phone :{
        type : String,
        required: true
    },
    crm :{
        type : String,
        required: true
    }
});

module.exports = mongoose.model('doctor', DoctorSchema);
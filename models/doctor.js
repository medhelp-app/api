/**
 * Created by jerem_000 on 09/05/2016.
 */
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
    }
});

module.exports = mongoose.model('doctor', DoctorSchema);
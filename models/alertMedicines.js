var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlertMedicinesSchema = new Schema({
    patientId : {
         type : Schema.Types.ObjectId, ref: 'patients'
    },
    medicines:{
        type: String
    },
    days:[String],
    timeType:{
        type: Number,// 0 = frequency and 1 = interval
    },
    timesPerDay: {
        type: Number
    },
    hourAlert:{
        type: Date
    },
    startDate:{
        type: Date
    },
    continuous:{
        type: Boolean
    },
    endDate:{
        type: Date
    },    
    nameDoctor:{
        type: String
    }
});

AlertMedicinesSchema.plugin(global.encrypt, { encryptionKey: global.encKey, signingKey: global.sigKey });

module.exports = mongoose.model('AlertMedicines', AlertMedicinesSchema);
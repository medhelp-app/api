var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecordSchema = new Schema({
    patientId : {
        type : Schema.Types.ObjectId, ref: 'patient'
    },
    doctorId :  {
        type : Schema.Types.ObjectId, ref: 'doctor'
    },
    queixaPrincipal: {
        type : String,
        get: global.decrypt, 
        set: global.encrypt
    },
    historicoDoenca: {
        type : String,
        get: global.decrypt, 
        set: global.encrypt
    },
    interrogatorio: {
        type : String,
        get: global.decrypt, 
        set: global.encrypt
    },
    antecedentesFamiliares: {
        type : String,
        get: global.decrypt, 
        set: global.encrypt
    },
    antecedentesPessoais: {
        type : String,
        get: global.decrypt, 
        set: global.encrypt
    },
    habitosVida: {
        type : String,
        get: global.decrypt, 
        set: global.encrypt
    },
    hipoteseDiagnostica: {
        type : String,
        get: global.decrypt, 
        set: global.encrypt
    },
    date: {
        type : Date,
        get: global.decrypt, 
        set: global.encrypt
    }
}, { toJSON: { getters: true } });

module.exports = mongoose.model('record', RecordSchema);
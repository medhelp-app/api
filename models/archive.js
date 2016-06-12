var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArchiveSchema = new Schema({
    idUser :{
        type : String
    },
    archive :{
        type : String
    },
    type :{
        type : String,
        enum: ['prescription', 'exam']
    }
});

module.exports = mongoose.model('archive', ArchiveSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArchiveSchema = new Schema({
    idUser :{
        type : String
    },
    archive :{
        type : String
    }
});

module.exports = mongoose.model('archive', ArchiveSchema);
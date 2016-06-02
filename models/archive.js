var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArchiveSchema = new Schema({
    user :{
        type : String
    },
    archive :{
        type : String
    }
});

module.exports = mongoose.model('archive', ArchiveSchema);
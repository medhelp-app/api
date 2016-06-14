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

ArchiveSchema.plugin(global.encrypt, { encryptionKey: global.encKey, signingKey: global.sigKey });

module.exports = mongoose.model('archive', ArchiveSchema);
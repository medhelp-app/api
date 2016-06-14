var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VoteSchema = new Schema({
    idPublication :{
        type : Schema.Types.ObjectId, ref: 'publications'
    },
    type: {
        type: String,
        enum: ['agree', 'disagree']
    },
    idUser : {
        type : Schema.Types.ObjectId, ref: 'user'
    },
    date : {
        type: Date
    }
});

VoteSchema.plugin(global.encrypt, { encryptionKey: global.encKey, signingKey: global.sigKey });

module.exports = mongoose.model('vote', VoteSchema);
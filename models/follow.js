var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FollowSchema = new Schema({
    idPatient: {
        type : Schema.Types.ObjectId, ref: 'patients'
    },
    idDoctor: {
         type : Schema.Types.ObjectId, ref: 'doctors'
    },
    date: {
    	type: Date
    }
});

FollowSchema.plugin(global.encrypt, { encryptionKey: global.encKey, signingKey: global.sigKey });

module.exports = mongoose.model('follow', FollowSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FollowSchema = new Schema({
    idPatient :{
        type : Schema.Types.ObjectId, ref: 'patients'
    },
    idDoctor :{
         type : Schema.Types.ObjectId, ref: 'doctors'
    }
});

module.exports = mongoose.model('follow', FollowSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    idPublication :{
        type : Schema.Types.ObjectId, ref: 'publications'
    },
    text: {
        type: String,
        get: global.decrypt, 
        set: global.encrypt
    },
    idUser: {
        type : Schema.Types.ObjectId, ref: 'user'
    },
    date: {
    	type: Date
    }
}, { toJSON: { getters: true } });

module.exports = mongoose.model('comment', CommentSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    idPublication :{
        type : Schema.Types.ObjectId, ref: 'publication'
    },
    text: {
        type: String
    },
    idUser: {
        type : Schema.Types.ObjectId, ref: 'users'
    },
    date: {
    	type: Date
    }
});

module.exports = mongoose.model('comment', CommentSchema);
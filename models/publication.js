var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublicationSchema = new Schema({
    idUser :{
        type : Schema.Types.ObjectId, ref: 'users'
    },
    type: {
        type: String,
        enum: ['post', 'question']
    },
    text: {
        type: String
    },
    date: {
    	type: Date
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
    agree: [{ type: Schema.Types.ObjectId, ref: 'vote'}]
});

module.exports = mongoose.model('publication', PublicationSchema);

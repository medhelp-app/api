var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublicationSchema = new Schema({
    idUser :{
        type : Schema.Types.ObjectId, ref: 'user'
    },
    type: {
        type: String,
        enum: ['post', 'question']
    },
    text: {
        type: String,
        get: global.decrypt, 
        set: global.encrypt
    },
    date: {
    	type: Date
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment'}],
    votes: [{ type: Schema.Types.ObjectId, ref: 'vote'}]
}, { toJSON: { getters: true } });

module.exports = mongoose.model('publication', PublicationSchema);

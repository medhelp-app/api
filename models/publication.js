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
    }
});

module.exports = mongoose.model('publication', PublicationSchema);
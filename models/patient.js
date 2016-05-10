/**
 * Created by jerem_000 on 09/05/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PacientSchema = new Schema({
    idUser : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('pacient', PacientSchema);
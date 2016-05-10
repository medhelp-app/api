/**
 * Created by jerem_000 on 09/05/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DoctorSchema = new Schema({
    idUser : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('doctor', DoctorSchema);
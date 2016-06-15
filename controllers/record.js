var Doctor = require('../models/doctor');
var Patient = require('../models/patient');
var Record = require('../models/record');

function RecordController () {
	
}

RecordController.prototype.insert = function(_patientId, _record, callback) {
	Patient.findOne({_id: _patientId},function (error, patient) {
		if(error){
			callback(null, error);
		} else{
			Doctor.findOne({_id: _record.doctorId}, function(error,doctor){
				var record = new Record();
				record.patientId = _record.patientId;
				record.doctorId = _record.doctorId;
				record.queixaPrincipal = _record.queixaPrincipal;
				record.historicoDoenca = _record.historicoDoenca;
				record.interrogatorio = _record.interrogatorio;
				record.antecedentesFamiliares = _record.antecedentesFamiliares;
				record.antecedentesPessoais = _record.antecedentesPessoais;
				record.habitosVida = _record.habitosVida;
				record.hipoteseDiagnostica = _record.hipoteseDiagnostica;

				record.save(function (error, record) {
					if (error) {
						callback(null, error);
					}
					else{
						callback(_record);
					}
				});
			})
		}
	});
};

RecordController.prototype.getDoctor = function(_doctorId, callback) {
	Doctor.findOne({_id: _doctorId},function (error, doctor) {
		if(error){
			callback(null, error);
		}
		else{
			Record.find({doctorId: _doctorId}, function(error,records){
				if(error){
					callback(null, error);
				}
				else{
					callback(records);
				}
			});
		}
	});
};

RecordController.prototype.getPatient = function(_patientId, callback) {
	Patient.findOne({_id: _patientId},function (error, patient) {
		if(error){
			callback(null, error);
		}
		else{
			Record.find({patientId: _patientId}, function(error, records){
				if(error){
					callback(null, error);
				}
				else{
					callback(records);
				}
			});
		}
	});
};

RecordController.prototype.get = function(_id, callback) {
	Record.findOne({_id: _id},function (error, records) {
		if(error){
			callback(null, error);
		}
		else{
			callback(records);
		}
	});
};


RecordController.prototype.delete = function(_id,callback) {
	Record.remove({_id: _id},function (error, publication) {
		if (error) {
			callback(null, error);
		} else {
			callback({success:"ok"});
		}
	});
};

module.exports = RecordController;
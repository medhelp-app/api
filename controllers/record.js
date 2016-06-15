var Doctor = require('../models/doctor');
var Patient = require('../models/patient');
var Record = require('../models/record');
var User = require('../models/user');

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
				record.date = _record.date;

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
	Patient.findOne({_id: _patientId}, function (error, patient) {
		if(error){
			callback(null, error);
		}
		else{
			Record.find({patientId: _patientId}).populate('doctorId').exec(function(error, records){
				if(error){
					callback(null, error);
				}
				else{
					var idDoctor = [];
					for(var i=0;i<records.length;i++){
						idDoctor.push(records[i].doctorId._id);
					}
					User.find({_id:{$in: idDoctor}}, function(error, users){
						if(error){
							callback(null,error);
						}
						else{
							var recordsTotal = [];
							for(var i=0;i<users.length;i++){
								for(var j=0;j<records.length;j++){
									if(users[i]._id+""==records[j].doctorId._id+""){
										var record = {
											patientId: records[j].patientId,
											doctorId: records[j].doctorId._id,
											queixaPrincipal: records[j].queixaPrincipal,
											historicoDoenca: records[j].historicoDoenca,
											interrogatorio: records[j].interrogatorio,
											antecedentesFamiliares: records[j].antecedentesPessoaisecedentesFamiliares,
											antecedentesPessoais: records[j].antecedentesPessoais,
											habitosVida: records[j].habitosVida,
											hipoteseDiagnostica: records[j].hipoteseDiagnostica,
											doctorName: users[i].name
										}
										recordsTotal.push(record);
									}
								}
							}
							callback(recordsTotal);
						}
					});
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
var Follow = require('../models/follow');

function FollowController () {
	
}

FollowController.prototype.insert = function(_follow, callback) {
	Follow.findOne({idDoctor: _follow.idDoctor, idPatient: _follow.idPatient}, function(error,result) {
		if(error){
			callback(null,error);
		}
		else{
			if(result){
				callback(null,{error:"Este paciente já segue este médico"});
			}
			else{
				var follow = new Follow();
				follow.idDoctor = _follow.idDoctor;
				follow.idPatient = _follow.idPatient;
				follow.date = _follow.date;
				follow.save(function (error,follow) {
					if(error){
						callback(null,error);
					}
					else{
						callback({success:"ok"})
					}
				});
				
			}
		}
	});
};

FollowController.prototype.delete = function(_idDoctor, _idPatient, callback) {
	Follow.findOne({idDoctor: _idDoctor,idPatient: _idPatient}, function(error,follow) {
		if(error){
			callback(null, error);
		}
		else{
			if(follow){
				Follow.remove({_id: follow._id}, function (error, result) {
					if (error) {
						callback(null, error);
					} else {
						callback({success:"ok"});
					}
				});
			}
			else{
				callback(null, {error:"Este paciente não segue este médico"});
			}
		}
	});
};

module.exports = FollowController;
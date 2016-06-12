var Vote = require('../models/vote');

function VoteController () {
	
}

VoteController.prototype.insert = function(_vote, callback) {
	Vote.findOne({idUser: _vote.idUser, idPublication: _vote.idPublication}, function(error,result) {
		if(error){
			callback(null,error);
		}
		else{
			if(result){
				callback(null,{error:"Esse usuário já votou nessa publicação"});
			}
			else{
				var vote = new Vote();
				vote.idUser = _vote.idUser;
				vote.idPublication = _vote.idPublication;
				vote.type = _vote.type;
				vote.date = _vote.date;
				vote.save(function (error,vote) {
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

VoteController.prototype.delete = function(_idPublication, _idUser, callback) {
	Vote.findOne({idUser: _idUser,idPublication: _idPublication}, function(error,vote) {
		if(error){
			callback(null, error);
		}
		else{
			if(vote){
				Vote.remove({_id: vote._id}, function (error, result) {
					if (error) {
						callback(null, error);
					} else {
						callback({success:"ok"});
					}
				});
			}
			else{
				callback(null, {error:"Esse usuário não votou nessa publicação"});
			}
		}
	});
};

module.exports = VoteController;
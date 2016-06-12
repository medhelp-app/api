var Vote = require('../models/vote');

function VoteController () {
	
}

VoteController.prototype.insert = function(_vote, callback) {
	Vote.find({idUser: _vote.idUser},{idPublication: _vote.idPublication}, function(error,result) {
		if(error){
			callback(null,error);
		}
		else{
			if(result.length<=0){
				var vote = new Vote();
				vote.idUser = _vote.idUser;
				vote._idPublication = _vote.idPublication;
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
			else{
				callback(null,{error:"Esse usuário já votou nessa publicação"});
			}
		}
	});
};

VoteController.prototype.delete = function(_idPublication, _idUser, callback) {
	Vote.findOne({idUser: _idUser},{idPublication: _idPublication}, function(error,vote) {
		if(error){
			callback(null, error);
		}
		else{
			if(vote){
				Vote.remove({_id: vote._id}, function (error, publication) {
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

VoteController.prototype.update = function(_vote, callback) {
	Vote.find({idUser: _vote.idUser},{idPublication: _vote.idPublication}, function (error, vote) {
		if (error) {
			callback(null, error);
		} else {
			if(vote){
				Vote.update({_id: vote._id}, { $set: _vote }, { upsert: true }, function (error, publication) {
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
var Vote = require('../models/vote');
var Publication = require('../models/publication');

function VoteController () {
	
}

VoteController.prototype.insert = function(_idPublication, _vote, callback) {
	Vote.findOne({idUser: _vote.idUser, idPublication: _idPublication}, function(error,result) {
		if(error){
			callback(null,error);
		}
		else{
			if(result){
				if(result.type!=_vote.type){
					Vote.update({_id: result._id}, { $set: {type:_vote.type} }, { upsert: true }, function (error, status) {
						if(error){
							callback(null,error);
						}
						else{
							callback({success:"ok"});
						}
					});
				}
				else{
					callback(null,{error:"Esse usuário já votou nessa publicação"});
				}				
			}
			else{
				Publication.findOne({_id: _idPublication}, function(error, publication) {
					var vote = new Vote();
					vote.idUser = _vote.idUser;
					vote.idPublication = _idPublication;
					vote.type = _vote.type;
					vote.date = _vote.date;
					vote.save(function (error,vote) {
						if(error){
							callback(null,error);
						}
						else{
							publication.votes.push(vote);
							publication.save(function (error, res) {
								if (error) {
									callback(null, error);
								} else {
									callback({success: 'true'});
								}
							});
						}
					});
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
				Publication.findOne({_id: _idPublication}, function(error, publication) {
					if(error){
						callback(null, error);
					}
					else{
						Vote.remove({_id: vote._id}, function (error, result) {
							if (error) {
								callback(null, error);
							} else {
								publication.votes.splice(publication.votes.indexOf(vote),1);
								publication.save(function (error, res) {
									if (error) {
										callback(null, error);
									} else {
										callback({success: 'true'});
									}
								});
							}
						});
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
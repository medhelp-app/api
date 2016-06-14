var Vote = require('../models/vote');
var Publication = require('../models/publication');
var Doctor = require('../models/doctor');
var User = require('../models/user');

function VoteController () {
	
}

VoteController.prototype.insert = function(_idPublication, _vote, callback) {
	Vote.find(function(error,result) {
		if(error){
			callback(null,error);
		} else {
			console.log(result);
			console.log(_vote);
			result = global.find(result, { idUser: _vote.idUser, idPublication: _idPublication })[0];

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
				Publication.find({_id: _idPublication}, function(error, publication) {
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
							publication[0].votes.push(vote);
							publication[0].save(function (error, res) {
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

VoteController.prototype.getPublication = function(_idPublication, callback) {
	Vote.find({idPublication: _idPublication}).populate('idUser').exec(function(error,votes) {
		if(error){
			callback(null,error);
		}
		else{
			var votesTotal = [];
			for(var i=0;i<votes.length;i++){
				var vote = {
					nameUser: votes[i].idUser.name,
					idUser: votes[i].idUser._id,
					_id: votes[i]._id,
					idPublication: votes[i].idPublication,
					type: votes[i].type,
					date: votes[i].date,
					imageUser: votes[i].profileImage
				};
				votesTotal.push(vote);
			}
			callback(votesTotal);
		}
	});
};


module.exports = VoteController;
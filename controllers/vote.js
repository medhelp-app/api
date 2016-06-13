var Vote = require('../models/vote');
var Publication = require('../models/publication');
var Doctor = require('../models/doctor');
var User = require('../models/user');

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
			var idUsers = [];
			for(var i=0;i<votes.length;i++){
				idUsers.push(votes[i].idUser._id);
			}
			User.aggregate([{$match: {_id: {$in: idUsers}}},{$lookup : { from: 'doctors', localField: "_id",foreignField: "_id", as: "more"}}],function (error, result){			
			//Doctor.find({'_id': { $in: idUsers}}).populate('_id').exec(function(error, doctors){
				if(error){
					callback(null,error);
				}
				else{
					callback(result);
					// var commentsTotal = [];
					// for(var i=0;i<doctors.length;i++){
					// 	var comment = {
					// 		nameUser: comments[i].idUser.name,
					// 		idUser: comments[i].idUser._id,
					// 		_id: comments[i]._id,
					// 		idPublication: comments[i].idPublication,
					// 		text: comments[i].text,
					// 		date: comments[i].date,
					// 		imageUser: doctors[i].profileImage
					// 	};
					// 	commentsTotal.push(comment);
					// }
					// callback(commentsTotal);
				}
			});
		}
	});
};


module.exports = VoteController;
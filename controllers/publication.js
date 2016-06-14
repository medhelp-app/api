var Doctor = require('../models/doctor');
var User = require('../models/user');
var Comment = require('../models/comment');
var Vote = require('../models/vote');
var Publication = require('../models/publication');
var UserController = require('../controllers/user');

function PublicationController () {
	
}

PublicationController.prototype.insert = function(_publication, callback) {
	if(_publication.text!=""){
		User.find({_id: _publication.idUser},function (error, user) {
			if(error){
				callback(null, error);
			}else{
				var publication = new Publication();
				publication.idUser = _publication.idUser;
				publication.type = _publication.type;
				publication.text = _publication.text;
				publication.date = _publication.date;
				publication.save(function (error, publication) {
					if (error) {
						callback(null, error);
					}
					else{
						callback(_publication);
					}
				});
			}
		});
	}
	else{
		callback(null,{error:"Texto da postagem está vazio"});
	}
};

PublicationController.prototype.getAll = function(callback) {
	// .populate('comments').populate('votes')
	Publication.find(function (error, publications) {
		console.log('publications');
		console.log(publications);
		if (error) {
			callback(null, error);
		} else {
			Comment.find(function (error, comments) {
				console.log('comments');
				console.log(comments);
				if (error) {
					callback(null, error);
				} else {
					Vote.find(function (error, votes) {
						console.log('votes');
						console.log(votes);
						if (error) {
							callback(null, error);
						} else {
							//console.log(global.populate(publications, comments, '_id', 'idPublication'));
							console.log(global.populate(publications, votes, '_id', 'idPublication', 'votes'));

							var publicationComplete = [];
							for(var i=0;i<publications.length;i++){
								var agree = 0;
								var disagree = 0;
								for(var j=0;j<publications[i].votes.length;j++){
									if(publications[i].votes[j].type=="agree") agree+=1;
									else disagree+=1;
								}
								var publication = {
									idUser: publications[i].idUser,
									_id: publications[i]._id,
									type: publications[i].type,
									text: publications[i].text,
									date: publications[i].date,
									comments: publications[i].comments.length,
									agree: agree,
									disagree: disagree
								};
								publicationComplete.push(publication);
							}
							callback(publicationComplete);
						}
					});
				}
			});
		}
	});
};

PublicationController.prototype.get = function(_id, callback) {
	Publication.findById(_id).populate('comments').populate('votes').exec(function (error, publication) {
		if (error) {
			callback(null, error);
		} else {
				var agree = 0;
				var disagree = 0;
				for(var j=0;j<publication.votes.length;j++){
					if(publication.votes[j].type=="agree") agree+=1;
					else disagree+=1;
				}
				var publicationa = {
					idUser: publication.idUser,
					_id: publication._id,
					type: publication.type,
					text: publication.text,
					date: publication.date,
					sizeComments: publication.comments.length,
					comments: publication.comments,
					votes: publication.votes,
					agree: agree,
					disagree: disagree
				};

			}
			callback(publicationa);
	});
};

PublicationController.prototype.delete = function(_idPublication,callback) {
	Publication.remove({_id: _idPublication},function (error, publication) {
		if (error) {
			callback(null, error);
		} else {
			callback({success:"ok"});
		}
	});
};

PublicationController.prototype.update = function(id, _publication,callback) {
	Publication.findOne({_id: id},function (error, publication) {
		if (error) {
			callback(null, error);
		} else {
			Publication.update({_id: id}, { $set: _publication }, { upsert: true }, function (error, publication) {
				if (error) {
					callback(null, error);
				} else {
					callback({success:"ok"});
				}
			});
		}
	});
};

module.exports = PublicationController;
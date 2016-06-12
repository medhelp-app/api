var Comment = require('../models/comment');
var Publication = require('../models/publication');

function CommentController () {
	
}

CommentController.prototype.insert = function(_idPublication, _comment, callback) {
	Comment.findOne({idUser: _comment.idUser,idPublication: _idPublication}, function(error,result) {
		if(error){
			callback(null,error);
		}
		else{
			Publication.findOne({_id: _idPublication}, function(error, publication) {
				if(error){
					callback(null,error);
				}
				else{
					var comment = new Comment();
					comment.idUser = _comment.idUser;
					comment.idPublication = _idPublication;
					comment.text = _comment.text;
					comment.date = _comment.date;
					comment.save(function (error,comment) {
						if(error){
							callback(null,error);
						}
						else{
							publication.comments.push(comment);
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
	});
};

CommentController.prototype.delete = function(_idPublication, _idUser, callback) {
	Comment.findOne({idUser: _idUser, idPublication: _idPublication}, function(error,comment) {
		if(error){
			callback(null, error);
		}
		else{
			if(comment){
				Publication.findOne({_id: _idPublication}, function(error, publication) {
					if(error){
						callback(null,error);
					}
					else{						
						Comment.remove({_id: comment._id}, function (error, result) {
							if (error) {
								callback(null, error);
							} else {
								publication.comments.splice(publication.comments.indexOf(comment),1);
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
				callback(null, {error:"Esse usuário não comentou nessa publicação"});
			}
		}
	});
};

module.exports = CommentController;
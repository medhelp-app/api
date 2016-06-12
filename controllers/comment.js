var Comment = require('../models/comment');

function CommentController () {
	
}

CommentController.prototype.insert = function(_comment, callback) {
	Comment.findOne({idUser: _comment.idUser,idPublication: _comment.idPublication}, function(error,result) {
		if(error){
			callback(null,error);
		}
		else{
			var comment = new Comment();
			comment.idUser = _comment.idUser;
			comment.idPublication = _comment.idPublication;
			comment.text = _comment.text;
			comment.date = _comment.date;
			comment.save(function (error,comment) {
				if(error){
					callback(null,error);
				}
				else{
					callback({success:"ok"})
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
				Comment.remove({_id: comment._id}, function (error, result) {
					if (error) {
						callback(null, error);
					} else {
						callback({success:"ok"});
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
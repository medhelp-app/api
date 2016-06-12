var Comment = require('../models/comment');

function CommentController () {
	
}

CommentController.prototype.insert = function(_comment, callback) {
	Comment.findOne({idUser: _comment.idUser},{idPublication: _comment.idPublication}, function(error,result) {
		if(error){
			callback(null,error);
		}
		else{
			if(!result){
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
			else{
				callback(null,{error:"Esse usuário já votou nessa publicação"});
			}
		}
	});
};

CommentController.prototype.delete = function(_idPublication, _idUser, callback) {
	Comment.findOne({idUser: _idUser},{idPublication: _idPublication}, function(error,comment) {
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
				callback(null, {error:"Esse usuário não votou nessa publicação"});
			}
		}
	});
};

module.exports = CommentController;
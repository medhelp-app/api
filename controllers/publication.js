var Doctor = require('../models/doctor');
var User = require('../models/user');
var Comment = require('../models/comment');
var Publication = require('../models/publication');
var UserController = require('../controllers/user');

function PublicationController () {
	
}

PublicationController.prototype.insert = function(_publication, callback) {
	if(_publication.text!=""){
		User.findOne({_id: _publication.idUser},function (error, user) {
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
	Publication.find(function (error, publications) {
		if (error) {
			callback(null, error);
		} else {
			var idPublications = [];
			for(var i=0;i<publications.length;i++){
				idPublications.push(publications[i]._id);
			}
			Comment.find({idPublication: { $in: idPublications}}).populate('idPublication').exec(function(error, result){ 
				callback(result);
			});
		}
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
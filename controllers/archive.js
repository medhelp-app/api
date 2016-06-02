var Archive = require('../models/archive');
var UserController = require('../controllers/user');
var Functions = require('../util/functions');
var fs = require('fs');

function ArchiveController () {
    this.functions = new Functions();

}
ArchiveController.prototype.insert = function (idUser,_archive,callback) {
    var userController = new UserController;
    var archive = new Archive();
    archive._id = idUser;

    userController.getForId(idUser, function (user, error) {
        if (error) {
            callback({error: 'Id inválido.'});
        } else {
            fs.readFile('./uploads/'+_archive.filename, function (error, data) {
                data = new Buffer(data).toString('base64');
                if(error){
                    callback(null,error);
                }
                else{
                    archive.archive = data;
                    archive.save(function (error) {
                        if (error) {
                            fs.unlink('./uploads/'+_archive.filename);
                            callback(error);
                        } else {
                            fs.unlink('./uploads/'+_archive.filename);
                            callback({ sucess: "ok" });
                        }
                    });
                }     
            });             
        };
    });
}

ArchiveController.prototype.getForId = function (idUser, callback) {
    var userController = new UserController();

    Archive.find({ _id: idUser },function (error, archives) {
        if (error) {
            callback(null, error);
        } else {
            callback(archives);
        }
    })
};

ArchiveController.prototype.delete = function (idUser, _archive, callback) {
    var userController = new UserController();

    Archive.remove({ _id: idUser, archive:_archive },function (error, result) {
        if (error) {
            callback(null, error);
        } else {
            callback({success:"Removido com Sucesso"});
        }
    })
};

ArchiveController.prototype.get = function (idUser, _archive, callback) {
    var userController = new UserController();

    Archive.findOne({ _id: idUser, archive:_archive },function (error, archive) {
        if (error) {
            callback(null, error);
        } else {
            callback(archive);
        }
    })
};


module.exports = ArchiveController;
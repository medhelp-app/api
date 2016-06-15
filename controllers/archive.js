var Archive = require('../models/archive');
var UserController = require('../controllers/user');
var fs = require('fs');

function ArchiveController () {
}

ArchiveController.prototype.insert = function (_idUser,_archive,callback) {
    var userController = new UserController;
    var archive = new Archive();
    patientController.getForId(_idUser, function (user, error) {
        if (error) {
            callback(null,error);
        } else {
            fs.readFile('./uploads/'+_archive.filename, function (error, data) {
                data = new Buffer(data).toString('base64');
                archive.archive = data;
                archive.idUser = idUser;
                archive.type = _archive.type;
                archive.save(function (error) {
                    if (error) {
                        fs.unlink('./uploads/'+_archive.filename);
                        callback(error);
                    } else {
                        fs.unlink('./uploads/'+_archive.filename);
                        callback({ sucess: "ok" });
                    }
                });     
            });             
        };
    });
}

ArchiveController.prototype.getForId = function (id, callback) {
    var userController = new UserController();

    Archive.find({ _id: id },function (error, archives) {
        if (error) {
            callback(null, error);
        } else {
            callback(archives);
        }
    })
};

ArchiveController.prototype.delete = function (id, callback) {
    var userController = new UserController();

    Archive.remove({ _id: id },function (error, result) {
        if (error) {
            callback(null, error);
        } else {
            callback({success:"Removido com Sucesso"});
        }
    })
};

ArchiveController.prototype.get = function (idUser, callback) {
    var userController = new UserController();

    Archive.findOne({ _id: idUser },function (error, archive) {
        if (error) {
            callback(null, error);
        } else {
            callback(archive);
        }
    })
};


module.exports = ArchiveController;
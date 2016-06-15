var Archive = require('../models/archive');
var UserController = require('../controllers/user');
var PatientController = require('../controllers/patient');
var fs = require('fs');

function ArchiveController () {
}

ArchiveController.prototype.insert = function (_idUser,_archive,callback) {
    var patientController = new PatientController;
    var archive = new Archive();
    patientController.getForId(_idUser, function (user, error) {
        if (error) {
            callback(null,error);
        } else {
            fs.readFile('./uploads/'+_archive.filename, function (error, data) {
                data = new Buffer(data).toString('base64');
                archive.archive = data;
                archive.idUser = _idUser;
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

ArchiveController.prototype.get = function (_id, callback) {
    Archive.find({ _id: _id },function (error, archives) {
        if (error) {
            callback(null, error);
        } else {
            callback(archives);
        }
    })
};

ArchiveController.prototype.delete = function (id, callback) {
    Archive.remove({ _id: id },function (error, result) {
        if (error) {
            callback(null, error);
        } else {
            callback({success:"Removido com Sucesso"});
        }
    })
};

ArchiveController.prototype.getUser = function (idUser, callback) {
    Archive.find({ idUser: idUser },function (error, archive) {
        if (error) {
            callback(null, error);
        } else {
            callback(archive);
        }
    })
};


module.exports = ArchiveController;
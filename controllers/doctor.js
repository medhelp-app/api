var Doctor = require('../models/doctor');
var User = require('../models/user');
var UserController = require('../controllers/user');
var Functions = require('../util/functions');
var fs = require('fs');

function DoctorController () {
	this.functions = new Functions();
}

DoctorController.prototype.getAll = function(callback) {
	Doctor.find(function (error, doctors) {
		if (error) {
			callback(null, error);
		} else {
			callback(doctors);
		}
	});
};

DoctorController.prototype.findSpeciality = function(callback) {
	Doctor.find().distinct('doctorType', function (error, doctors) {
		if (error) {
			callback(null, error);
		} else {
			callback(doctors);
		}
	});	
};

DoctorController.prototype.findName = function(name, callback) {
	var userController = new UserController();
	User.find({name: new RegExp(name, "i"), userType: "1" }, function (error, users) {
		if (error) {
			callback(null, error);
		} else {
			usersId = [];
			for (var i = 0; i < users.length; i++) {
		    	usersId.push(users[i]._id);
		    }
			Doctor.find({'_id': 
				{ $in: usersId}
			}, function(err, doctors){
					docs = [];
				    for (var i = 0; i < doctors.length; i++) {
					    var doctorFull = {
					    	_id: users[i].id,
					    	name: users[i].name,
					    	email: users[i].email,
					    	doctorType: doctors[i].doctorType,
					    	profileImage: doctors[i].profileImage
					    }
					    docs.push(doctorFull);
				    }
				    
				    callback(docs);
				}
			);
		}
	});
};

/*--------------------HealthInsurance------------------*/
DoctorController.prototype.insertHealthInsurance = function (id, body, callback) {
	Doctor.findById(id, function (err, doctor) {
		if(err){
			callback({error: 'Error ao encontrar médico!'})
		}else{
			if(doctor){
				doctor.healthInsurance.push({healthInsurance: body.healthInsurance});
				doctor.save(function (err) {
					if(err){
						callback({error: 'Error ao atualizar!'})
					}else{
						callback({success: 'true'})
					}
				})
			}else{
				callback({error: 'Médico não existe!'})
			}
		}
	})
}
DoctorController.prototype.getHealthInsurance = function (id,callback) {
	Doctor.findById(id, function (err, doctor) {
		if(err){
			callback({error: 'Error ao encontrar médico!'});
		}else{
			if(doctor){
				callback(doctor.healthInsurance);
			}else{
				callback({error: 'Médico não existe!'});
			}
		}
	})
}
DoctorController.prototype.deleteHealthInsurance = function (id, idHealthInsurance, callback) {
	Doctor.findById(id, function (err, doctor) {
		if(err){
			callback({error: 'Error ao encontrar médico!'})
		}else{
			if(doctor){
				doctor.healthInsurance.id(idHealthInsurance).remove();
				doctor.save(function (err) {
					if(err){
						callback({error: 'Error ao atualizar!'})
					}else{
						callback({success: 'true'})
					}
				})
			}else{
				callback({error: 'Médico não existe!'})
			}
		}
	})
}
DoctorController.prototype.updateHealthInsurance = function (id, idHealthInsurance, callback) {
	Doctor.findById(id, function (err, doctor) {
		if(err){
			callback({error: 'Error ao encontrar médico!'})
		}else{
			if(doctor){
				doctor.healthInsurance.id(idHealthInsurance).remove();
				doctor.save(function (err) {
					if(err){
						callback({error: 'Error ao atualizar!'})
					}else{
						callback({success: 'true'})
					}
				})
			}else{
				callback({error: 'Médico não existe!'})
			}
		}
	})
}
/*--------------------END - HealthInsurance------------------*/

/* --------------------------Opinion--------------------------------*/
DoctorController.prototype.insertOpinion = function (doctorId, _opinion, callback) {
	Doctor.findOne({ _id: doctorId }, function (error, doctor) {
		if (error) {
			callback(null, error);
		} else {
			if (doctor) {
				var opinion = {
					generalRating: (parseFloat(_opinion.punctualityRating) + parseFloat(_opinion.attentionRating) + parseFloat(_opinion.installationRating)) / 3,
					punctualityRating: _opinion.punctualityRating,
					attentionRating: _opinion.attentionRating,
					installationRating: _opinion.installationRating,
					comment : _opinion.comment 
				}
				doctor.opinions.push(opinion);
				
				doctor.save(function (error) {
                    if(error){
                        callback({ success : "false" })
                    }else{
                        callback({ success: "true" })
                    }
                })
			}
		}
	});
}

DoctorController.prototype.getAllOpinionsById = function (doctorId, callback) {
	Doctor.findOne({ _id: doctorId }, function (error, doctor) {
		if (error) {
			callback(null, error);
		} else {
			if (doctor) {
				callback(doctor.opinions);
			}
		}
	});
}

DoctorController.prototype.getSummaryRatings = function (doctorId, callback) {
	Doctor.findOne({ _id: doctorId }, function (error, doctor) {
		if (error) {
			callback(null, error);
		} else {
			if (doctor) {
				var generalRatingMean = 0;
				var punctualityRatingMean = 0;
				var attentionRatingMean = 0;
				var installationsRatingMean = 0;
				var optionsLength = doctor.opinions.length;

				for (var i = 0; i < doctor.opinions.length; i++) {
					generalRatingMean += doctor.opinions[i].generalRating;
					punctualityRatingMean += doctor.opinions[i].punctualityRating;
					attentionRatingMean += doctor.opinions[i].attentionRating;
					installationsRatingMean += doctor.opinions[i].installationRating;
				}

				generalRatingMean /= optionsLength;
				punctualityRatingMean /= optionsLength;
				attentionRatingMean /= optionsLength;
				installationsRatingMean /= optionsLength;

				var opinionsMean = {
					generalRating: generalRatingMean,
					punctualityRating: punctualityRatingMean,
					attentionRating: attentionRatingMean,
					installationRating: installationsRatingMean,
					numberOfEvaluations: optionsLength
				}

				callback(opinionsMean);
			}
		}
	});
}

DoctorController.prototype.insert = function (_doctor, callback) {
	var doctor = new Doctor();
	doctor._id = _doctor._id;
	doctor.addressStreet = _doctor.addressStreet;
	doctor.addressNumber = _doctor.addressNumber;
	doctor.city = _doctor.city;
	doctor.state = _doctor.state;
	doctor.zipCode = _doctor.zipCode;
	doctor.country = _doctor.country;
	doctor.phone = _doctor.phone;
	doctor.crm = _doctor.crm;
	doctor.ufCrm = _doctor.ufCrm;
	doctor.doctorType = _doctor.doctorType;
	doctor.crmStatus = _doctor.crmStatus;
	doctor.save(function (error, doctor) {
		if (error) {
			callback(null, error);
		} else {
			callback(doctor);
		}
	});
}

DoctorController.prototype.getForId = function (idUser, callback) {
	var userController = new UserController();
	Doctor.findOne({ _id: idUser }, function (error, doctor) {
		if (error) {
			callback(null, error);
		} else {
			if (doctor) {
				userController.getForId(idUser, function (user, error) {
					if (error) {
						callback(null, error);
					} else {
						var userFull = {
							_id: doctor._id,
							name: user.name,
							email: user.email,
							userType: user.userType,
							password: user.password,
							addressStreet: doctor.addressStreet,
							addressNumber: doctor.addressNumber,
							city: doctor.city,
							state: doctor.state,
							zipCode: doctor.zipCode,
							country: doctor.country,
							phone: doctor.phone,
							crm: doctor.crm,
							ufCrm: doctor.ufCrm,
							doctorType: doctor.doctorType,
							crmStatus: doctor.crmStatus,
							profileImage: doctor.profileImage
						}

						callback(userFull);
					};
				});
			} else {
				callback({error : "Médico não existente."});
			}
		}
	})
};

DoctorController.prototype.update = function (id, _doctor, callback) {
	var userController = new UserController();
	var functions = this.functions;

	userController.getForId(id, function (user, error) {
		if (error) {
			callback({ error: 'Id inválido.' });
		} else {
			if (_doctor.email === '' || _doctor.name === '') {
				callback({ error : "O campo 'nome' e 'e-mail' são obrigatórios." });
			} else {
				var url = 'http://www.consultacrm.com.br/api/index.php?tipo=crm&uf='+_doctor.ufCrm+'&q='+_doctor.crm+'&chave=6332538751&destino=json';
				Functions.prototype.getApi(url, function (data) {
					var dadosCrm = JSON.parse(data).item;
					if(dadosCrm.length===0){
						callback({ error: 'Crm inválido.' });
					}else{
						if (functions.validateEmail(_doctor.email)) {
							var userUpdate = {
								name: _doctor.name,
								email: _doctor.email
							};

							var doctorUpdate = {
								addressStreet: _doctor.addressStreet,
								addressNumber:  _doctor.addressNumber,
								city: _doctor.city,
								state: _doctor.state,
								zipCode: _doctor.zipCode,
								country: _doctor.country,
								phone: _doctor.phone,
								crm: _doctor.crm,
								ufCrm: _doctor.ufCrm,
								doctorType: _doctor.doctorType,
								crmStatus: dadosCrm[0].crmStatus
							};

							if (user.email === _doctor.email) {
								userController.update(id, userUpdate, function (status, error) {
									if (error) {
										callback(error);
									} else {
										Doctor.update({ _id:id }, { $set: doctorUpdate }, { upsert: true }, function (error, status) {
											if (error) {
												callback(error);
											} else {
												callback({ sucess: "ok" });
											}
										});
									}
								});
							} else {
								userController.getEmail(_doctor.email, function (users, erros) {
									if (erros) {
										callback(erros);
									} else {
										if (users.length === 0) {
											userController.update(id, userUpdate, function (status, error) {
												if (error) {
													callback(error);
												} else {
													Doctor.update({ _id:id }, { $set: doctorUpdate }, { upsert: true }, function (error, status) {
														if (error) {
															callback(error);
														} else {
															callback({ sucess: "ok" });
														};
													});
												}
											});
										} else {
											callback({error : 'E-mail já existente.'});
										};
									};
								});
							};
						} else {
							callback({ error: 'E-mail inválido.' });
						};
					}
				})

			};
		};
	});
};

DoctorController.prototype.updateImage = function (id, _image, callback) {
    var userController = new UserController();
    var functions = this.functions;
    userController.getForId(id, function (user, error) {
        if (error) {
            callback({error: 'Id inválido.'});
        } else {
            fs.readFile('./uploads/'+_image.filename, function (error, data) {
                data = new Buffer(data).toString('base64');
                if(error){
                    callback(null,error);
                }
                else{
                    Doctor.update({ _id: id }, { $set: {profileImage:data} }, { upsert: true }, function (error, status) {
                        if (error) {
                            fs.unlink('./uploads/'+_image.filename);
                            callback(error);
                        } else {
                            fs.unlink('./uploads/'+_image.filename);
                            callback({ sucess: "ok" });
                        }
                    });
                }     
            });             
        };
    });
};

DoctorController.prototype.getForIdImage = function (idUser, callback) {
    var userController = new UserController();

    Doctor.findOne({ _id: idUser },function (error, doctor) {
        if (error) {
            callback(null, error);
        } else {
            if (doctor) {
                userController.getForId(idUser, function (user, error) {
                    if (error) {
                        callback(null, error);
                    } else {
                        var image = {
                            profileImage: doctor.profileImage
                        };
                        callback(image);
                    }
                });
            } else {
                callback({ error : "Paciente não existente." });
            }
        }
    })
};

DoctorController.prototype.delete = function(id, callback) {
	User.remove({ _id: id }, function (error) {
		if (error) {
			callback(null, { error: 'ID inválido.' });
		} else {
			Doctor.remove({_id: id},function (error, user) {
				if(error){
					callback(null, error);
				}else{
					callback({ message: 'Removido com sucesso.' });
				}
			})
		}
	});
};

/*DoctorController.prototype.updateImage = function (id, _image, callback) {
    var userController = new UserController();
    var functions = this.functions;
    userController.getForId(id, function (user, error) {
        if (error) {
            callback({error: 'Id inválido.'});
        } else {
            fs.readFile('./uploads/'+_image.filename, function (error, data) {
                if(error){
                    callback(null,error);
                }
                else{
                    var dir = "./image/doctors/"+id+"/profileImage_"+id+".png";
                    fs.writeFile(dir, data, function (error) {
                    	fs.unlink('./uploads/'+_image.filename);
                        if(error){
                            callback(error);
                        }
                        else{
                            callback({ sucess: "ok",imagem: dir });
                        }
                    });
                }     
            });             
        };
    });
};*/

module.exports = DoctorController;
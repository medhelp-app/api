var User = require('../models/user');
var Functions = require('../util/functions');
var Patient = require('../models/patient');
var Doctor = require('../models/doctor');

function UserController () {
	this.functions = new Functions();
}

UserController.prototype.getAll = function(callback) {
	User.find(function (error, users) {
		if (error) {
			callback(null, error);
		} else {
			callback(users);
		}
	});
};
UserController.prototype.update = function (id, user, callback) {
	User.update({_id:id}, { $set: user}, {upsert: false}, function (error, status) {
		if(error){
			callback(error);
		} else{
			callback(status);
		}
	});
}
UserController.prototype.getEmail = function(_email,callback) {
	User.find({email:_email},function (error, users) {
		if (error) {
			callback(null, error);
		} else {
			callback(users);
		}
	});
};
UserController.prototype.getForId = function (idUser, callback) {
	User.findOne({_id: idUser},function (error, user) {
		if(error){
			callback(null, error);
		}else{
			callback(user);
		}
	})
};

UserController.prototype.insert = function(_user, callback) {
	var functions = this.functions;

	var userType = _user.userType;
	User.find({ email: _user.email }, function (error, users) {
		if (error) {
			callback(null, error);
		} else {
			if (functions.validateEmail(_user.email)) {
				if (_user.password == _user.rePassword && _user.password.length > 6) {
						console.log(users);
						if (users.length === 0) {
							if(_user.userType == 0 || _user.userType == 1){

								if (_user.name) {
									var user = new User();
									user.userType = _user.userType;
									user.name = _user.name;
									user.email = _user.email;
									user.password = _user.password;

									user.save(function (error, _user) {
										if (error) {
											callback(null, error);
										} else {
											if (userType == 0) {
												var patient = new Patient();
												patient._id = _user._id;
												patient.addressStreet = "";
												patient.addressNumber = "";
												patient.city = "";
												patient.state = "";
												patient.zipCode = "";
												patient.country = "";
												patient.phone = "";

												patient.save(function (error, patient) {
													if (error) {
														callback(null, error);
													} else {
														callback(_user);
													}
												});
											} else {
												var doctor = new Doctor();
												doctor._id = _user._id;
												doctor.addressStreet = "";
												doctor.addressNumber = "";
												doctor.city = "";
												doctor.state = "";
												doctor.zipCode = "";
												doctor.country = "";
												doctor.phone = "";
												doctor.crm = "";

												doctor.save(function (error, doctor) {
													if (error) {
														callback(null, error);
													} else {
														callback(_user);
													}
												});
											}
										}
									});
								} else {
									callback(null, { error: 'O campo \'name\' é obrigatório.' });
								}
							}else{
								callback(null, { error: 'Tipo de usuário inválido.' });
							}

						} else {
							callback(null, { error: 'E-mail duplicado.' });
						}
				} else {
					callback(null, { error: 'Senhas inválidas.' })	
				}
			} else {
				callback(null, { error: 'E-mail inválido.' })
			}
		}
	});
};

UserController.prototype.login = function(login, callback) {
	if (login && login.email && login.password) {
		User.find({ email: login.email, password: login.password }, function (error, users) {
			if (error) {
				callback(null, error);
			} else {
				if (users.length > 0) {
					callback(users[0]);
				} else {
					callback(null, { error: 'E-mail ou senha inválidos.' });
				}
			}
		});
	} else {
		callback(null, { error: 'E-mail ou senha inválidos.' });
	}
};

UserController.prototype.delete = function(id, callback) {
	User.remove({ _id: id }, function (error) {
		if (error) {
			callback(null, { error: 'ID inválido.' });
		} else {
			callback({ message: 'Removido com sucesso.' });
		}
	});
};

module.exports = UserController;
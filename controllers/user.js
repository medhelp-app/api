var PatientController = require('../controllers/patient');
var DoctorController = require('../controllers/doctor');
var User = require('../models/user');
var Functions = require('../util/functions');

function UserController () {
	this.functions = new Functions();
}

var PatientController = require('../controllers/patient');
var patientController = new PatientController();
var DoctorController = require('../controllers/doctor');
var doctorController = new DoctorController();


UserController.prototype.getAll = function(callback) {
	User.find(function (error, users) {
		if (error) {
			callback(null, error);
		} else {
			callback(users);
		}
	});
};

UserController.prototype.insert = function(_user, callback) {
	var functions = this.functions;
	var e = _user.enum;
	User.find({ email: _user.email }, function (error, users) {
		if (error) {
			callback(null, error);
		} else {
			if (functions.validateEmail(_user.email)) {
				if (_user.password == _user.rePassword && _user.password.length > 6) {
						if (users.length === 0) {
							if(e == 0 || e == 1){

								if (_user.name) {
									var user = new User();
									user.name = _user.name;
									user.email = _user.email;
									user.password = _user.password;

									user.save(function (error, _user) {
										if (error) {
											callback(null, error);
										} else {
											if(e == 0){
												patientController.insert(_user._id,function (patient, error) {
													if(error){
														//remover user
														User.remove({ _id: _user._id }, function (error) {
															if (error) {
																callback(null, { error: 'Erro ao desfazer erro de cadastro de usuário.' });
															} else {
																callback({ error: 'Não foi Possível cadastrar o usuário.' });
															}
														});
													} else {
														callback(_user);
													}
												});
											}else{
												doctorController.insert(_user._id, function (doctor, error) {
													if(error){
														//remover user
														User.remove({ _id: _user._id }, function (error) {
															if (error) {
																callback(null, { error: 'Erro ao desfazer erro de cadastro de usuário.' });
															} else {
																callback({ error: 'Não foi Possível cadastrar o usuário.' });
															}
														});
													}else{
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
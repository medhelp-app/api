var User = require('../models/user');
var Functions = require('../util/functions');

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

UserController.prototype.insert = function(_user, callback) {
	var functions = this.functions;

	User.find({ email: _user.email }, function (error, users) {
		if (error) {
			callback(null, error);
		} else {
			if (functions.validateEmail(_user.email)) {
				if (_user.password == _user.rePassword && _user.password.length > 6) {
					if (users.length === 0) {
						if (_user.name) {
							var user = new User();
							user.name = _user.name;
							user.email = _user.email;
							user.password = _user.password;

							user.save(function (error, _user) {
								if (error) {
									callback(null, error);
								} else {
									callback(_user);
								}
							});
						} else {
							callback(null, { error: 'O campo \'name\' é obrigatório.' });	
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
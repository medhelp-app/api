var Doctor = require('../models/doctor');
var UserController = require('../controllers/user');
var Functions = require('../util/functions');

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
							crm: doctor.crm
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
						crm: _doctor.crm
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
			};
		};
	});
};

module.exports = DoctorController;
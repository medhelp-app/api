var User = require('../models/user');
var Functions = require('../util/functions');
var Patient = require('../models/patient');
var Doctor = require('../models/doctor');
var sha512 = require('sha512');
var fs = require('fs');
var nodemailer = require('nodemailer');

var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'medhelp.noreply@gmail.com',
        pass: 'medhelp123'
    }
}));

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

UserController.prototype.findName = function(name, callback) {
	User.find({name: new RegExp(name, "i"), userType: "1" }, function (error, doctors) {
		if (error) {
			callback(null, error);
		} else {
			callback(doctors);
		}
	});
};

UserController.prototype.findDoctors = function(callback) {
	User.find({ userType: "1" }).distinct('name', function (error, doctors) {
		if (error) {
			callback(null, error);
		} else {
			callback(doctors);
		}
	});
};

UserController.prototype.insert = function(_user, callback) {
	var functions = this.functions;
	var userType = _user.userType;

	User.find({ email: _user.email }, function (error, users) {
		if (error) {
			callback(null, error);
		} else {
			if (functions.validateEmail(_user.email)) {
				if (_user.password == _user.rePassword && _user.password.length >= 6) {
						if (users.length === 0) {
							if(_user.userType == 0 || _user.userType == 1){

								if (_user.name) {
									var user = new User();
									user.userType = _user.userType;
									user.name = _user.name;
									user.email = _user.email;
									user.password = sha512(_user.password).toString('hex');
									user.save(function (error, _user) {
										var mailOptions = {
										    from: '"MedHelp Time" <medhelp.noreply@gmail.com>',
										    to: _user.email,
										    subject: 'Bem Vindo ao Medhelp',
										   	text: 'Bem Vindo ao Medhelp',
										    html: '<html xmlns="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/xhtml"><head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> <meta name="viewport" content="width=device-width" /> <!-- For development, pass document through inliner --> </head><body style="margin: 0;padding: 0;font-size: 100%;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;width: 100% !important;height: 100%;background: #efefef;-webkit-font-smoothing: antialiased;-webkit-text-size-adjust: none"><table class="body-wrap" style="margin: 0;padding: 0;font-size: 100%;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;width: 100% !important;height: 100%;background: #efefef;-webkit-font-smoothing: antialiased;-webkit-text-size-adjust: none"> <tr style="margin: 0;padding: 0;font-size: 100%;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65"> <td class="container" style="margin: 0 auto !important;padding: 0;font-size: 100%;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;display: block !important;clear: both !important;max-width: 580px !important"> <!-- Message start --> <table style="margin: 0;padding: 0;font-size: 100%;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;width: 100% !important;border-collapse: collapse"> <tr style="margin: 0;padding: 0;font-size: 100%;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65"> <td align="center" class="masthead" style="margin: 0;padding: 80px 0;font-size: 100%;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;background: #020590;color: white"> <h1 style="margin: 0 auto !important;padding: 0;font-size: 32px;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.25;margin-bottom: 20px;max-width: 90%;text-transform: uppercase">Bem vindo ao Medhelp</h1> </td> </tr> <tr style="margin: 0;padding: 0;font-size: 100%;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65"> <td class="content" style="margin: 0;padding: 30px 35px;font-size: 100%;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;background: white"> <h2 style="margin: 0;padding: 0;font-size: 28px;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.25;margin-bottom: 20px">Olá, você agora faz parte do MedHelp</h2> <p style="margin: 0;padding: 0;font-size: 16px;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;font-weight: normal;margin-bottom: 20px">MedHelp é uma solução para facilitar na comunicação entre os pacientes e médicos.</p> <table style="margin: 0;padding: 0;font-size: 100%;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;width: 100% !important;border-collapse: collapse"> <tr style="margin: 0;padding: 0;font-size: 100%;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65"> <td align="center" style="margin: 0;padding: 0;font-size: 100%;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65"> <p style="margin: 0;padding: 0;font-size: 16px;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;font-weight: normal;margin-bottom: 20px"> <a href="#" class="button" style="margin: 0;padding: 0;font-size: 100%;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;color: white;text-decoration: none;display: inline-block;background: #020590;border: solid #020590;border-width: 10px 20px 8px;font-weight: bold;border-radius: 4px">Acesse sua conta</a> </p> </td> </tr> </table> </td> </tr> </table> </td> </tr> <tr style="margin: 0;padding: 0;font-size: 100%;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65"> <td class="container" style="margin: 0 auto !important;padding: 0;font-size: 100%;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;display: block !important;clear: both !important;max-width: 580px !important"> <!-- Message start --> <table style="margin: 0;padding: 0;font-size: 100%;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;width: 100% !important;border-collapse: collapse"> <tr style="margin: 0;padding: 0;font-size: 100%;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65"> <td class="content footer" align="center" style="margin: 0;padding: 30px 35px;font-size: 100%;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;background: none"> <p style="margin: 0;padding: 0;font-size: 14px;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;font-weight: normal;margin-bottom: 0;color: #888;text-align: center">Enviado por <a href="http://medhelp-app.github.io/" style="margin: 0;padding: 0;font-size: 100%;font-family: &quot;Avenir Next&quot;, &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;line-height: 1.65;color: #888;text-decoration: none;font-weight: bold">MedHelp</a></p> </td> </tr> </table> </td> </tr></table></body></html>'
										};
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
												patient.profileImage = "";
												patient.bodyPart = [{part : 'rightArm', problems: []},{part : 'leftArm', problems: []},{part : 'rightLeg', problems: []},{part : 'leftLeg', problems: []},{part : 'stomach', problems: []},{part : 'chest', problems: []},{part : 'head', problems: []}];
												
												patient.save(function (error, patient) {
													if (error) {
														callback(null, error);
													} else {
														transporter.sendMail(mailOptions, function(error, info){
														    if(error){
														        callback(null,error);
														    }
														    else{
														    	console.log("funfou");
														    	callback(_user);
														    }
														});	
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
												doctor.profileImage = "";

												doctor.save(function (error, doctor) {
													if (error) {
														callback(null, error);
													} else {
														transporter.sendMail(mailOptions, function(error, info){
														    if(error){
														        callback(null,error);
														    }
														    else{
														    	callback(_user);
														    }
														});
													}
												});
											}
										}
									});
								} else {
									callback(null, { error: 'O campo \'name\' é obrigatório.' });
								}
							} else {
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
		var passwordHash = sha512(login.password).toString('hex');
		User.find({ email: login.email, password: passwordHash }, function (error, users) {
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
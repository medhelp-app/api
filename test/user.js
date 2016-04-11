var expect = require('chai').expect;
var UserController = require('../controllers/user');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/medhelp');

describe('User Controller', function () {
	var userController = new UserController();
	var user = {
		name: 'Paulo',
		email: 'paulo@gmail.com',
		password: '1234567',
		rePassword: '1234567'
	};

	var invalids = {
		id: '1',
		email: 'teste',
		password: '123'
	}

	describe('When call UserController.getAll()', function () {
		it('should return a list with all users', function (done) {
			userController.getAll(function (users, error) {
				expect(users).to.be.instanceof(Array);
				expect(error).to.not.be.ok;

				done();
			});
		});
	});

	describe('When call UserController.insert(user)', function () {
		it('should return a created user if the user is valid', function (done) {
			userController.insert(user, function (_user, error) {
				expect(_user).to.be.instanceof(Object);
				expect(error).to.not.be.ok;

				user.id = _user._id;

				done();
			});
		});

		it('should return a invalid email message if the email is invalid', function (done) {
			user.email = invalids.email;

			userController.insert(user, function (_user, error) {
				expect(_user).to.not.be.ok
				expect(error.error).to.equal('E-mail inválido.');

				done();
			});
		});

		it('should return a invalid password message if the passwords is not equals', function (done) {
			user.email = 'paulo@gmail.com';
			user.rePassword = invalids.password;

			userController.insert(user, function (_user, error) {
				expect(_user).to.not.be.ok
				expect(error.error).to.equal('Senhas inválidas.');

				done();
			});
		});

		it('should return a invalid password message if the password is less than 6 characters', function (done) {
			user.email = 'paulo@gmail.com';
			user.password = invalids.password;
			user.rePassword = invalids.password;

			userController.insert(user, function (_user, error) {
				expect(_user).to.not.be.ok
				expect(error.error).to.equal('Senhas inválidas.');

				done();
			});
		});

		it('should return a duplicated email message if the email is duplicated', function (done) {
			user.email = 'paulo@gmail.com';
			user.password = '1234567';
			user.rePassword = '1234567';

			userController.insert(user, function (_user, error) {
				expect(_user).to.not.be.ok
				expect(error.error).to.equal('E-mail duplicado.');

				done();
			});
		});
	});

	describe('When call UserController.delete(id)', function () {
		it('should return a successfully message if id is valid', function (done) {
			userController.delete(user.id, function (message, error) {
				expect(message.message).to.equal('Removido com sucesso.');
				expect(error).to.not.be.ok;

				user.id = null;

				done();
			});
		});

		it('should return a invalid id message if id is invalid', function (done) {
			userController.delete(invalids.id, function (message, error) {
				expect(message).to.not.be.ok;
				expect(error.error).to.equal('ID inválido.');

				user.id = null;

				done();
			});
		});
	});
});
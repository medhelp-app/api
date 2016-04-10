var expect = require('chai').expect;
var UserController = require('../controllers/user');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/medhelp');

describe('User Controller', function () {
	var userController = new UserController();

	describe('When call User.getAll()', function () {
		it('should return a list with all users', function (done) {
			userController.getAll(function (users, error) {
				expect(users).to.be.instanceof(Array);
				expect(error).to.not.be.ok;

				done();
			});
		});
	});
});
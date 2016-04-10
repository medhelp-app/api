function UserController () {
	this.User = require('../models/user');
}

UserController.prototype.getAll = function(callback) {
	this.User.find(function (error, users) {
		if (error) {
			callback(null, error);
		} else {
			callback(users);
		}
	});
};

UserController.prototype.insert = function(user, callback) {
	user.save(function (error, users) {
		if (error) {
			callback(null, error);
		} else {
			callback(users);
		}
	});
};

module.exports = UserController;
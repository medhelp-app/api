var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: { 
		type: String, 
		required: true 
	},
	email: { 
		type: String, 
		required: true 
	},
	password: { 
		type: String, 
		required: true 
	},
	userType: {
		type: String,
		required: true
	},
	profileImage: {
		type: String
	}
});

UserSchema.plugin(global.encrypt, { encryptionKey: global.encKey, signingKey: global.sigKey });

module.exports = mongoose.model('user', UserSchema);
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function Functions () {
	
}
Functions.prototype.getApi = function (url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if(xhr.readyState ===4){
			callback(xhr.responseText, xhr.status)
		}
	}
	xhr.open('GET', url)
	xhr.send(null)
}

Functions.prototype.validateEmail = function(email) {
	console.log(email);
	var regex = /\S+@\S+\.\S+/;
	return regex.test(email);
};

module.exports = Functions;
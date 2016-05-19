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
	var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email);
};

module.exports = Functions;
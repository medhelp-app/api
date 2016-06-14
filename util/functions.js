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

global.find = function (list, filter) {
	var result = [];
	var matchsWithFilter;
	for (var i = 0; i < list.length; i++) {
		matchsWithFilter = null;
		for (var j = 0; j < Object.keys(filter).length; j++) {
			if (list[i][Object.keys(filter)[j]] != filter[Object.keys(filter)[j]]) {
				matchsWithFilter = null;
				break;
			}

			matchsWithFilter = list[i];
		}

		if (matchsWithFilter != null) {
			result.push(matchsWithFilter);
		}
	}

	return result;
}

global.distinct = function (list, field) {
	var result = [];

	for (var i = 0; i < list.length; i++) {
		var item = copy(list[i]);

		for (var j = 0; j < Object.keys(item).length; j++) {
			if (Object.keys(item)[j] == field) {
				result.push(item[Object.keys(item)[j]]);
				break;
			}
		}
	}

	return result;
}

global.populate = function (list1, list2, field1, field2, save) {
	var result = [];
	for (var i = 0; i < list1.length; i++) {
		result.push(copy(list1[i]));
		result[i][save] = [];

		for (var j = 0; j < list2.length; j++) {
			if (list1[i][field1].toString() === list2[j][field2].toString()) {
				result[i][save].push(list2[j]);
			}
		}
	}

	return result;
}

function copy (obj) {
	return JSON.parse(JSON.stringify(obj));
}

module.exports = Functions;
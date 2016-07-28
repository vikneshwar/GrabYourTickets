var request = require('request');

function makeRequest(options,callback) {
	request.get(options,callback);
}

module.exports = makeRequest;
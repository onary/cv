var Crypto = require('crypto');

module.exports.randomToken = function(len) {
	len = len || 32;
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ',
		setLen = set.length, token = '', i;

	for (i = 0; i < len; i++) {
		token += set[Math.floor(Math.random() * setLen)];
	}

	return token;
};

module.exports.hashToken = function(data) {
	return Crypto.createHash('sha1').update(data).digest('hex');
};

module.exports.init = function(compound) {
	compound.utils.safe_merge(compound.utils, module.exports);
}

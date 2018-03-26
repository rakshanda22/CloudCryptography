var mongoose = require('mongoose');
var conn2 = require('../utils/mongodbConnections').conn2;

var Data = mongoose.Schema({
	email: { type: String, unique: true },
	finalEncryptedMessage2 : String
});

var data = conn2.model('Data', Data);

module.exports = data;
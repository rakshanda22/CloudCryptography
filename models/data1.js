var mongoose = require('mongoose');
var conn1 = require('../utils/mongodbConnections').conn1;
var Data = mongoose.Schema({
	email: { type: String, unique: true },
	finalEncryptedMessage1 : String
});

var data = conn1.model('Data', Data);

module.exports = data;
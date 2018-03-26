var mongoose = require('mongoose');
var conn1 = mongoose.createConnection('mongodb://rakshanda:12345678@ds163418.mlab.com:63418/database1', { useMongoClient: true });
var conn2 = mongoose.createConnection('mongodb://rakshanda:12345678@ds163418.mlab.com:63418/database2', { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports.conn1 = conn1;
module.exports.conn2 = conn2;
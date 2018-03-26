var express = require('express');
var router = express.Router();
var Data1 = require('../models/data1');
var Data2 = require('../models/data2');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/save', function(req, res) {
	console.log(req.body);
	Data1.findOne({email : req.body.email}, function(err, pdata) {
		if(err) res.send("Some Error");

		if(pdata){

			pdata.finalEncryptedMessage1 = req.body.finalEncryptedMessage1;
			pdata.save(function(err) {
				if(err) console.log(err);
				Data2.findOne({email : req.body.email}, function(err, pdata1) {
					if(err) res.send("Some Error");

					if(pdata1){

						pdata1.finalEncryptedMessage2 = req.body.finalEncryptedMessage2;
						
						pdata1.save(function(err) {
							if(err) console.log(err);
							res.send('Data Saved Successfully!<br><a href="/get">Decrypt</a>');
						});
					}
				});
			});
		} else {
			var data = new Data1({
				email : req.body.email,
				finalEncryptedMessage1 : req.body.finalEncryptedMessage1
			});

			data.save(function(err) {
				if(err) console.log(err);
				var data1 = new Data2({
					email : req.body.email,
					finalEncryptedMessage2 : req.body.finalEncryptedMessage2
				});
				data1.save(function(err) {
					if(err) console.log(err);
					res.send('Data Saved Successfully!<br><a href="/get">Decrypt</a>');
				});
			});
		}
	})
	
});

/*router.get('/get-data', function(req, res) {
	Data1.findOne({email : req.body.email}, function(err, data) {
		if(err) {
			res.status(500).send("Some error occurred");
		}
		if(data) {
			res.status(200).json({
				email : data.email,
				finalEncryptedMessage1 : data.finalEncryptedMessage1,
				finalEncryptedMessage2 : data.finalEncryptedMessage2
			})
		}
	});
});*/

router.get('/get', function(req, res) {
	if(req.query.email) {
		Data1.findOne({email : req.query.email}, function(err, data) {
			if(err) {
				res.status(500).send("Some error occurred");
			}
			if(data) {
				Data2.findOne({email : req.query.email}, function(err, data1) {
					if(err) {
						res.status(500).send("Some error occurred");
					}
					if(data1) {
						res.render('getdata', {
							email : data.email,
							finalEncryptedMessage1 : data.finalEncryptedMessage1,
							finalEncryptedMessage2 : data1.finalEncryptedMessage2
						});
					}
				});
			}
		});
	} else {
		res.render('getdata', {
					email : '',
					finalEncryptedMessage1 : '',
					finalEncryptedMessage2 : ''
				});
	}
});

module.exports = router;
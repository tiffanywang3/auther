'use strict';

var router = require('express').Router(),
	morgan = require('morgan');
var User = require('../api/users/user.model');

router.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

router.use(function(req, res, next) {
	console.log("request made by ", req.user)
	// User.findById(req.session.userId)
	// .then(function(user){

	// 	//console.log('request made by ' + user.email);
	// 	next();
	// })
	next();
	
	
})
module.exports = router;
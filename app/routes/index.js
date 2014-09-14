
/*
 * GET home page.
 */

var Cache = require('../cache');

exports.index = function(req, res){
	
	res.render('index', { title: 'Express', history: history });
};


/*
 * GET home page.
 */

var cache = require('../cache');

exports.index = function(req, res){
	var history = cache.query;
	res.render('index', { title: 'Express', history: history });
};

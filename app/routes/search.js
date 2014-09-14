var DB = require("../DB");
var Sea = require("../search");

exports.index = function(req, res){
	var result = Sea.search(req.query.query, DB.data());
	res.render('search', {result: result});
};


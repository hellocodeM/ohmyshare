var DB = require("../DB");

exports.index = function(req, res){
	var result = search(req.query.query, DB.data);
	res.render('search', {result: result});
};

function search(query, data) {
	var result = data;
	return result;
}


var DB = [];


exports.get = function(query) {
	for (var i in DB) {
		if (DB[i].query === query) {
			return DB[i].result;
		}
	}
}

exports.set = function(query, result) {
	DB.push({
		query: query,
		result: result
	});
}


var fs = require("fs");
var Config = require("../config");
var DB = [];
var changed = false;

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
	changed = true;
}

exports.history = function() {
	return DB;	
}

exports.load = function() {
	var dest = Config.cacheDest;
	fs.exists(dest, function(exists) {
		if (exists) {
			fs.readFile(dest, function(err, data) {
				if (err) {
					console.log("failed", "read cache");
				} else {
					DB = JSON.parse(data);
				}
			})
		}
	})
}

function save() {
	var dest = Config.cacheDest;
	var data = JSON.stringify(DB);
	if (changed) { 
		fs.writeFile(dest, data, function(err) {
			if (err)
				console.log("failed:\tcache");
			else {
				console.log();
			}
		})	
		changed = false;
	}
}

exports.load();
setInterval(save, 1000 * 60);

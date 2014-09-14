var Cache = require("../cache");
var Fuse = require("./fuse");

exports.search = function(query, data) {
	var result;
	if ((result = Cache.get(query)) == undefined) {
		var options = {
			keys: ["name", "keywords"]
		}
		var fuse = new Fuse(data, options);
		result = fuse.search(query);
		Cache.set(query, result);
	}
	return result;
}


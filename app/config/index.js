var path = require("path");
var baseDir = path.resolve(__dirname, "../");

exports.baseDir = baseDir;

exports.cacheDest = path.join(baseDir, "cache", "cache.json");

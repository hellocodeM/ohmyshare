var fs = require('fs');
var path = require("path");
var dataDir = path.join(__dirname, "data");
var config = require("../config");
var baseDir = config.baseDir;

var files = [];

readAllFiles(dataDir, files);

function readAllFiles(dirname, files) {
	var curDirInfo = fs.readdirSync(dirname);
	for (var i in curDirInfo) {
		var fileStat = fs.statSync(path.join(dirname, curDirInfo[i]));
		if (fileStat.isFile()) {
			files.push({
				name: curDirInfo[i],
				link: path.relative("", path.join(dirname, curDirInfo[i])),
				desc: "shit"
			})
		}else if (fileStat.isDirectory()) {
			readAllFiles(path.join(dirname, curDirInfo[i]), files);
		}
	}
}

function update() {

}
exports.data = files;
exports.update = update;


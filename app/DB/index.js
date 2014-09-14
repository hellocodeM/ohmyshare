var fs = require('fs');
var path = require("path");
var dataDir = path.join(__dirname, "data");
var config = require("../config");
var baseDir = config.baseDir;
var Segment = require("segment").Segment;

var segment = new Segment();
segment.useDefault();

var files = [];

console.log("start", "reading all files");
readAllFiles(dataDir, files);
watchDir(dataDir);
console.log("start", "watchdir");

function readAllFiles(dirname, files) {
	var curDirInfo = fs.readdirSync(dirname);
	for (var i in curDirInfo) {
		var fileStat = fs.statSync(path.join(dirname, curDirInfo[i]))
		if (fileStat.isFile()) {
			files.push({
				name: curDirInfo[i],
				link: path.relative(dataDir, path.join(dirname, curDirInfo[i])),
				keywords: function(filename) {
					var res = [];
					var words = segment.doSegment(filename);
					for (var i in words) {
						if (words[i].w.length >= 2)
							res.push(words[i].w);
					}
					
					return res;
				}(path.basename(curDirInfo[i], path.extname(curDirInfo[i])))
			})
		}else if (fileStat.isDirectory()) {
			readAllFiles(path.join(dirname, curDirInfo[i]), files);
		}
	}
}

function watchDir(dirname) {
	var curDirInfo = fs.readdirSync(dirname);
	if (fs.statSync(dirname).isDirectory()) {
		watch(dirname);
	}
	for (var i in curDirInfo) {
		var filePath = path.join(dirname, curDirInfo[i]);
		var fileStat = fs.statSync(filePath);
		if (fileStat.isDirectory()) {
			watchDir(filePath);
		}
	}
}
function watch(dirname) {
	fs.watch(dirname, function(event, filename) {
		console.log(event, filename);
		console.log("files needed to be updated.");
		readAllFiles(dirname, files);
	});
}

exports.data = function() {
	return files;
};


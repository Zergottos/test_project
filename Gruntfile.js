var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {
	require("load-grunt-tasks")(grunt);

	grunt.initConfig({
		browserify: {
			dist: {
				files: {
					'dev/browserify/bundle.js': 'src/scripts/main.js'
				}
			}
		},

		babel: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'dev/dest/main.js': 'dev/browserify/bundle.js'
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-babel');

	grunt.registerTask('build', [
			'browserify',
			'babel'
	]);

// --------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('getPath', 'returns the file path', function() {
		var file = path.parse('/src/population.txt');
		//    root : "/",
		grunt.log.writeln(file.root);
		//    dir : "/home/user/dir",
		grunt.log.writeln(file.dir);
		//    base : "file.txt",
		grunt.log.writeln(file.base);
		//    ext : ".txt",
		grunt.log.writeln(file.ext);
		//    name : "file"
		grunt.log.writeln(file.name);
	});

// --------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('content', 'gets the content of a folder', function(dirName) {
		var folder = './' + dirName;
		grunt.log.writeln(folder);

		var content = fs.readdirSync(folder);

		content.forEach(function(file) {
			grunt.log.writeln('File: ' + file);
		});
	});

// --------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('isNum', 'Is numeric: ', function(n) {
		grunt.log.writeln(isNumeric(n));
	});

// --------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('convertJSON', 'Converts a file to JSON format.', function(dirName) {
		grunt.log.writeln();
		grunt.log.writeln('Converting...');

		var components = [];
		var values = [];
		var flag = true;

		var folder = './' + dirName;
		var folderContent = getDirContent(folder);

		var path = dirName + '/' + folderContent[0] + '/population.txt';

		var data = getFileContent(path);

		var dataLines = separateLines(data);

		var objectData = {};
		lastIndex = 0;
		for(var elements in dataLines) {
			var name;
			var values = [];

			Array.prototype.forEach.call(dataLines[elements], function(element, index) {
				if (isNumeric(element)) {
					values.push(element);
				} else {
					name = element;
				}
			});

			objectData[name] = values;
		}

		for(var n in objectData) {
			grunt.log.writeln('Property: ' + n);
			grunt.log.writeln('Values: ' + objectData[n]);
		}
	});
};

// --------------------------------------------------------------------------FUNCTIONS
function getDirContent(folder) {
	var folderContent = fs.readdirSync(folder);
	return folderContent;
}

function getFileContent(path) {
	var data = fs.readFileSync(path, (error, dt) => {
		if(error) {
			return grunt.log.writeln(error);
		}

		grunt.log.writeln('File read.');

		return dt;
	});

	return data;
}

function separateLines(data) {
	var tempData = {};
	var counter = 0;
	var lastIndex = 0;

	Array.prototype.forEach.call(data, function(symbol, index) {
		if(symbol === 9) {
			if (!tempData[counter]) {
				tempData[counter] = [];
			}

			tempData[counter].push(data.slice(lastIndex, index));
			lastIndex = index + 1;
		} else if(symbol === 10) {
			if (counter > 0) {
				tempData[counter].push(data.slice(lastIndex, index));
			}

			lastIndex = index + 1;
			counter++;
		}
	});

	return tempData;
}

function isNumeric(n) {
	var result;
	result = !(isNaN(parseInt(n)));
	return result;
}

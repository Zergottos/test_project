var fs = require('fs');
var path = require('path');

var components = [];
var values = [];
var flag = true;

var folder;
var folderContent;

var path;

var data;

var dataLines;

var objectData = {};

function load(dirName) {
	folder = './' + dirName;
	path = dirName + '/' + folderContent[0];
	folderContent = getDirContent(folder);
	data = getFileContent(path);
	dataLines = separateLines(data);

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

  return objectData;
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

function createLoadStream() {
  return {
    load: load,
    separateLines: separateLines
  };
}

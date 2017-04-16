var actual_JSON;
var data = {};
var length;
var progress = 0;

function init() {
	length = 0;
	for(var i in paths.data) {
		length++;
	}

	var fileName;
	for(var name in paths.data) {
		fileName = paths.root + paths.data[name];
		loadJSON(name, fileName, load);
	}
}

// Doesn't work on Chrome, because it does not allow ajax calls to local files.
function loadJSON(name, fileName, callback) {
	var result;
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	var url = fileName + '.json';
	xobj.open('GET', url, true);
	// Replace 'my_data' with the path to your file
	xobj.onreadystatechange = function() {
		if (xobj.readyState == 4 && xobj.status == "200") {
			// Required use of an anonymous callback
			// as .open() will NOT return a value but simply returns undefined in asynchronous mode
			callback(name, xobj.responseText);
		}
	};
	xobj.send('');
}

function load(name, response) {
	// var preload = new createjs.LoadQueue();
	// preload.addEventListener('fileload', handleFileComplete);

	// Parse JSON string into object
	actual_JSON = JSON.parse(response);
	data[name] = actual_JSON;

	progress++;

	if(progress >= length && data !== undefined) {
		start();
	}
}

function handleFileComplete(event) {
	start();
}

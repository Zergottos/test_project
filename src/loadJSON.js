var actual_JSON;
var data;

function load(response) {
  // var preload = new createjs.LoadQueue();
  // preload.addEventListener('fileload', handleFileComplete);

	// Parse JSON string into object
	actual_JSON = JSON.parse(response);
  data = actual_JSON;

  if(data !== undefined) {
	  start();
  }
}

function handleFileComplete(event) {
  start();
}

function initJSON() {
	var fileName = 'Prague/crime_cleared';

	var result = loadJSON(fileName, load);
}

// Doesn't work on Chrome, because it does not allow ajax calls to local files.
function loadJSON(fileName, callback) {
	var result;
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	var url = 'data/' + fileName + '.json';
	xobj.open('GET', url, true);
	// Replace 'my_data' with the path to your file
	xobj.onreadystatechange = function() {
		if (xobj.readyState == 4 && xobj.status == "200") {
			// Required use of an anonymous callback
			// as .open() will NOT return a value but simply returns undefined in asynchronous mode
			callback(xobj.responseText);
		}
	};
	xobj.send('');
}

// Doesn't work on Chrome, because it does not allow ajax calls to local files.
function loadJSON(callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', 'data/sample.json', true);
	// Replace 'my_data' with the path to your file
	xobj.onreadystatechange = function() {
		if (xobj.readyState == 4 && xobj.status == "200") {
			// Required use of an anonymous callback
			// as .open() will NOT return a value but simply returns undefined in asynchronous mode
			callback(xobj.responseText);
		}
	};
	xobj.send(null);
}

function initJSON() {
	loadJSON(function(response) {
		// Parse JSON string into object
		var actual_JSON = JSON.parse(response);
		console.log(actual_JSON);
	});
}

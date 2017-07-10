var stage;
var prizes = [];

function start() {
	var view1 = new View();
	
	var dataSet = fromObjectToArray(data['financial_data']);

	view1.initDataSet(dataSet, 'period');
	view1.initGraphs();
	view1.writeChart('chart');
}

// Extracts the [Array] properties of an Object and 
// creates an Array with Objects with the same property names.
// NOTE: The code with the period is customizes, should be made more general!!!
function fromObjectToArray(object) {
	var result = [];
	
	var tempObject;
	for(var index = 0; index < object['period'].length; index++) {
		tempObject = {};
		for(var prop in object) {
			if(prop === 'period') {
				var time = object[prop][index];
				tempObject[prop] = 	new Date(time, 0, 0, 0, 0, 0, 0);
				continue;
			}
			tempObject[prop] = 	object[prop][index];	
		}

		result.push(tempObject);
	}

	return result;
}
// function start1() {
// 	stage = new createjs.Stage("demoCanvas");
// 	stage.canvas.width = window.innerWidth;
// 	stage.canvas.height = window.innerHeight;

// 	stage.enableMouseOver(10);

// console.log(data);

// 	var filter = createFilter();
// 	filter.addData(data['crime_detected']['General']);
// 	filter.setTimeInterval(1); // yearly
// 	filter.convertToMothly();
// 	filter.calculateChange();
// 	prizes = 100;

// 	var calculatedPrizes = filter.filterData(prizes, 1, 2);

// 	var plain = createPlain();
// 	plain.init(stage.canvas.width, stage.canvas.height);

// 	plain.drawFunction(calculatedPrizes);

// 	stage.addChild(plain.container);

// 	createjs.Ticker.addEventListener("tick", function() {
// 		stage.update();
// 	});
// }

var chartData = [
	{date: new Date(2011, 5, 1, 0, 0, 0, 0), val1:10, val2: 10},
	{date: new Date(2011, 5, 2, 0, 0, 0, 0), val1:11, val2: 11},
	{date: new Date(2011, 5, 3, 0, 0, 0, 0), val1:12, val2: 13},
	{date: new Date(2011, 5, 4, 0, 0, 0, 0), val1:11, val2: 10},
	{date: new Date(2011, 5, 5, 0, 0, 0, 0), val1:10, val2: 12},
	{date: new Date(2011, 5, 6, 0, 0, 0, 0), val1:11, val2: 10},
	{date: new Date(2011, 5, 7, 0, 0, 0, 0), val1:13, val2: 11},
	{date: new Date(2011, 5, 8, 0, 0, 0, 0), val1:14, val2: 14},
	{date: new Date(2011, 5, 9, 0, 0, 0, 0), val1:17, val2: 10},
	{date: new Date(2011, 5, 10, 0, 0, 0, 0), val1:13, val2: 11}
];

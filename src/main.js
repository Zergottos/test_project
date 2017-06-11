var stage;
var prizes = [];

function start() {
	var view1 = new View();

	view1.initDataSet(chartData);
	view1.initGraphs();
	view1.writeChart('chart');
}

function start1() {
	stage = new createjs.Stage("demoCanvas");
	stage.canvas.width = window.innerWidth;
	stage.canvas.height = window.innerHeight;

	stage.enableMouseOver(10);

console.log(data);

	var filter = createFilter();
	filter.addData(data['crime_detected']['General']);
	filter.setTimeInterval(1); // yearly
	filter.convertToMothly();
	filter.calculateChange();
	prizes = 100;

	var calculatedPrizes = filter.filterData(prizes, 1, 2);

	var plain = createPlain();
	plain.init(stage.canvas.width, stage.canvas.height);

	plain.drawFunction(calculatedPrizes);

	stage.addChild(plain.container);

	createjs.Ticker.addEventListener("tick", function() {
		stage.update();
	});
}

var chartData = [
	{date: new Date(2011, 5, 1, 0, 0, 0, 0), val:10, val1: 10},
	{date: new Date(2011, 5, 2, 0, 0, 0, 0), val:11, val1: 11},
	{date: new Date(2011, 5, 3, 0, 0, 0, 0), val:12, val1: 13},
	{date: new Date(2011, 5, 4, 0, 0, 0, 0), val:11, val1: 10},
	{date: new Date(2011, 5, 5, 0, 0, 0, 0), val:10, val1: 12},
	{date: new Date(2011, 5, 6, 0, 0, 0, 0), val:11, val1: 10},
	{date: new Date(2011, 5, 7, 0, 0, 0, 0), val:13, val1: 11},
	{date: new Date(2011, 5, 8, 0, 0, 0, 0), val:14, val1: 14},
	{date: new Date(2011, 5, 9, 0, 0, 0, 0), val:17, val1: 10},
	{date: new Date(2011, 5, 10, 0, 0, 0, 0), val:13, val1: 11}
];

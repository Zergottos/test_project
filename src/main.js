var stage;
var prizes = [];

function start() {
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

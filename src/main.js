var stage;

function start() {
	stage = new createjs.Stage("demoCanvas");
	stage.canvas.width = window.innerWidth;
	stage.canvas.height = window.innerHeight;

	stage.enableMouseOver(10);

console.log(data);

	var plain = createPlain();
	plain.init(stage.canvas.width, stage.canvas.height);

	plain.drawFunction(data['crime_detected']['General']);

	stage.addChild(plain.container);

	createjs.Ticker.addEventListener("tick", function() {
		stage.update();
	});
}

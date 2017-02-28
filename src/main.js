var stage;

function start() {
	stage = new createjs.Stage("demoCanvas");
	stage.canvas.width = window.innerWidth;
	stage.canvas.height = window.innerHeight;

	var plain = createPlain();
	plain.init(stage.canvas.width, stage.canvas.height);

	// var button = createButton('Click me!', 26, function() {
	// 	console.log('You clicked me!');
	// });

	plain.drawFunction([100, 200, 120, 70, 330]);

	stage.addChild(plain.container);

	stage.update();
}

function createButton(text, size, callback) {
	var container = new createjs.Container();
	var text = new createjs.Text(text, size + 'px Arial', '#ff7700');

	var metrics = text.getMetrics();
	var button = new createjs.Shape();
	button.graphics.beginFill('Grey').drawRect(0, 0, metrics.width, metrics.height);

	button.on('click', callback);

	container.addChild(button);
	container.addChild(text);

	return container;
}

function drawLine(coordinates) {
	var line = new createjs.Shape();

	line.graphics.setStrokeStyle(1);
	line.graphics.beginStroke('#000000');

	Array.prototype.forEach.call(coordinates, function(point, index) {
		if(index > 0) {
			line.graphics.lineTo(point.x, point.y);
		} else {
			line.graphics.moveTo(point.x, point.y);
		}
	});

	line.graphics.endStroke();

	return line;
}

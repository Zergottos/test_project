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

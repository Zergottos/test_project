function createPlain() {
	return {
		width: 0,
		height: 0,
		offset: 30,
		container: null,
		axisX: {
			x: 0,
			y: 0,
			length: 0,
			segments: 10,
			segmentSize: 10
		},
		axisY: {
			x: 0,
			y: 0,
			length: 0,
			segments: 10,
			segmentSize: 10
		},

		init: function(width, height) {
			this.container = new createjs.Container();

			this.width = width;
			this.height = height;

			this.initAxisX();
			this.initAxisY();
		},

		initAxisX: function() {
			this.axisX.x = this.offset;
			this.axisX.y = this.height - this.offset;
			this.axisX.length = this.width - 2 * this.offset;

			this.axisX.shape = drawLine([
				{
					x: this.axisX.x,
					y: this.axisX.y
				},
				{
					x: this.axisX.x + this.axisX.length,
					y: this.axisX.y}
			]);

			this.container.addChild(this.axisX.shape);

			var step = this.axisX.length / this.axisX.segments;
			var startX = this.axisX.x;
			var baseY = this.axisX.y;
			var size = this.axisX.segmentSize / 2;
			for(var i = 0; i < this.axisX.segments; i++) {
				var segment = drawLine([
					{x: startX + step*(i+1), y: baseY + size},
					{x: startX + step*(i+1), y: baseY - size},
				]);

				this.container.addChild(segment);
			}
		},

		initAxisY: function() {
			this.axisY.x = this.offset;
			this.axisY.y = this.height - this.offset;

			this.axisY.length = this.height - 2 * this.offset;

			this.axisY.shape = drawLine([
				{
					x: this.axisY.x,
					y: this.axisY.y
				},
				{
					x: this.axisY.x,
					y: this.axisY.y - this.axisY.length}
			]);

			this.container.addChild(this.axisY.shape);

			var step = this.axisY.length / this.axisY.segments;
			var startY = this.axisY.y;
			var baseX = this.axisY.x;
			var size = this.axisY.segmentSize / 2;
			for(var i = 0; i < this.axisY.segments; i++) {
				var segment = drawLine([
					{x: baseX + size, y: startY - step*(i+1)},
					{x: baseX - size, y: startY - step*(i+1)},
				]);

				this.container.addChild(segment);
			}
		},

		drawFunction: function(values) {
			var scaledValues = this.scaleValues(values);
			var step = this.axisX.length / this.axisX.segments;
			var baseX = this.axisX.x;
			var baseY = this.offset;
			var length = this.axisY.length;
			var coordinates = [];
			for(var i = 0; i < scaledValues.length; i++) {
				var pointY = this.axisY.length - (scaledValues[i]/100)*length;
				var point = {
					x: baseX + step*(i+1),
					y: baseY + pointY
				};
				coordinates.push(point);
			}

			var fun = drawLine(coordinates);

			this.container.addChild(fun);
		},

		scaleValues: function(values) {
			var max = getMax(values);
			var min = getMin(values);

			var scaledValues = [];
			var temp;
			for(var i = 0; i < values.length; i++) {
				temp = getPrecentage(values[i], max).toFixed(2);
				scaledValues.push(temp);
			}

			return scaledValues;
		}
	};
}

// Private:
function getMax(array) {
	var result = array[0];
	for(var i = 1; i < array.length; i++) {
		if(result < array[i]) {
			result = array[i];
		}
	}

	return result;
}

function getMin(array) {
	var result = array[0];
	for(var i = 1; i < array.length; i++) {
		if(result > array[i]) {
			result = array[i];
		}
	}

	return result;
}

function getPrecentage(val1, val2) {
	return val1/val2 * 100;
}

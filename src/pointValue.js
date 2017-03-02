function createPointValue() {
	return {
		container: null,
		value: null,
		shape: null,
		text: null,

		init: function(value) {
			var shape = new createjs.Shape();
			shape.graphics.beginStroke('#6D7173').beginFill('#6D7173').drawCircle(0, 0, 5);
			this.shape = shape;

			var text = new createjs.Text(value, '20px Arial', '#ff7700');
			text.textBaseline = 'alphabetic';
			text.x = 5;
			text.y = -5;
			text.visible = false;
			this.text = text;

			var container = new createjs.Container();
			container.addChild(shape, text);
			this.container = container;

			this.shape.on('mouseover', function() {
				this.text.visible = true;
			}, this);

			this.shape.on('mouseout', function() {
				this.text.visible = false;
			}, this);
		}
	};
}

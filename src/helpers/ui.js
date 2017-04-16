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

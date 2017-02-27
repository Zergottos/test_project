var stage;

function start() {
  stage = new createjs.Stage("demoCanvas");
  stage.canvas.width = window.innerWidth;
  stage.canvas.height = window.innerHeight;

  var system = createSystem();

  var button = createButton('Click me!', 26, function() {
    console.log('You clicked me!');
  });

  render(system);

  var fun = drawFunction(
      [10, 20, 12, 7, 33],
      system
    );

  // stage.addChild(button);
  system.container.addChild(fun);
  stage.addChild(system.container);
  stage.addChild(fun);

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

function createSystem() {
  var system = {};
  system.container = new createjs.Container();

  system.x = 0;
  system.y = 0;
  system.width = window.innerWidth - 20;
  system.height = window.innerHeight / 2;

  system.axisX = {
    x: 10,
    y: system.height,
    length: system.width,
    segments: 10,
    segmentSize: 10
  };

  system.axisY = {
    x: 10,
    y: system.height,
    length: system.height,
    segments: 10,
    segmentSize: 10
  };

  return system;
}

function setAxis(type, options) {
  var axis = type ? axisX : axisY;

  for(var name in properties) {
    if(axisX[name] && properties[name] !== undefined && properties[name] !== null) {
      axisX[name] = properties[name];
    }
  }
}

function render(system) {
  renderAxisX(system);
  renderAxisY(system);
}

function renderAxisX(system) {
  system.axisX.shape = drawLine([
    {x: system.axisX.x, y: system.axisX.y},
    {x: system.axisX.x + system.axisX.length, y: system.axisX.y}
  ]);

  var step = system.axisX.length / system.axisX.segments;
  var baseY = system.axisX.y;
  var size = system.axisX.segmentSize / 2;
  for(var i = 0; i < system.axisX.segments; i++) {
    var segment = drawLine([
      {x: step*i, y: baseY + size},
      {x: step*i, y: baseY - size},
    ]);

    system.container.addChild(segment);
  }

  system.container.addChild(system.axisX.shape);
}

function renderAxisY(system) {
  system.axisY.shape = drawLine([
    {x: system.axisY.x, y: system.axisY.y},
    {x: system.axisY.x, y: system.axisY.y - system.axisY.length}
  ]);

  var step = system.axisY.length / system.axisY.segments;
  var baseX = system.axisY.x;
  var size = system.axisY.segmentSize / 2;
  for(var i = 0; i < system.axisY.segments; i++) {
    var segment = drawLine([
      {x: baseX + size, y: step*i},
      {x: baseX - size, y: step*i},
    ]);

    system.container.addChild(segment);
  }

  system.container.addChild(system.axisY.shape);
}

function drawFunction(values, system) {
  var scaledValues = scaleValues(values);
  var coordinates = [];

  var point = {};
  for(var i = 0; i < scaledValues.length; i++) {
    point.x = system.axisX.segmentSize * (i + 1) + system.axisX.x;
    point.y = system.axisY.y - scaledValues[i];

    coordinates.push(point);
  }

  return drawLine(coordinates);
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

function scaleValues(values) {
  var max = getMax(values);
  var min = getMin(values);

  var scaledValues = [];
  var temp;
  for(var i = 0; i < values.length; i++) {
    temp = getPrecentage(values[i], max);
    scaledValues.push(temp);
  }

  return scaledValues;
}

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

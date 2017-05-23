function createFilter() {
  return {
    //variables:
    factor: {}, //Data for the factor.
    calcInfluence: [], //Change of the IPH for the factor.

    //methods:
    addFactor: addFactor,
    calculatedInfluence: calculatedInfluence,
    //addLatency: addLatency,
    addLatency: addLatency_linear,
    calcPriceChange: calcPriceChange,
    calculateDifference: calculateDifference,
    calculateImpactValue: calculateImpactValue,
  };
}


//----------------------------------------------------------Methods
function addFactor(_factor) {
  this.factor = _factor;
}

function calculatedInfluence() {
  var impactValue = 0;
  var values = this.factor.values;
  this.calcInfluence.push(0);

  for(var i = 0; i < values.length-1; i++) {
    var difference = this.calculateDifference(values[i], values[i+1]);
    impactValue = this.calculateImpactValue(difference, this.factor.impact);
    this.calcInfluence.push(impactValue);
  }
}

function addLatency() {
  var self = this;
  var latency = this.factor.latency;

  var oldValues = this.calcInfluence.splice(0, this.calcInfluence.length);

  Array.prototype.forEach.call(oldValues, function(value, index){
    for(var i = 0; i < latency; i++) { self.calcInfluence.push(value); }
  });
}

function addLatency_linear() {
  var self = this;
  var latency = this.factor.latency;

  var oldValues = this.calcInfluence.splice(0, this.calcInfluence.length);

  Array.prototype.forEach.call(oldValues, function(value, index){
    for(var i = 0; i < latency; i++) {
      self.calcInfluence.push(value / latency);
    }
  });
}

function calcPriceChange(currentPrice, period) {
  return currentPrice * this.calcInfluence[period] / 100;
}

function calculateDifference(value1, value2) {
  return ((value2/value1 * 100)-100);
}

function calculateImpactValue(value, impact) {
  return value * impact / 100;
}


function createFactor() {
  return {
    //methods:
    setFactorType: setFactorType,
    setLatency: setLatency,
    setImpact: setImpact,
    setTimeUnit: setTimeUnit,
    setPriority: setPriority,
    setValues: setValues,
    implenmentFactor: implenmentFactor,
  };
}

function setFactorType(_factorType) {
  this.factorType = _factorType;
}

function setLatency(_latency) {
  this.latency = _latency;
}

function setImpact(_impact) {
  this.impact = _impact;
}

function setTimeUnit(_timeUnit) {
  this.timeUnit = _timeUnit;
}

function setPriority(_priority) {
  this.priority = _priority;
}

function setValues(_values) {
  this.values = _values;
}

function implenmentFactor(data) {
  //Checks for existing properties in data.
  for(var propertyName in data) {
    var propertyValue =  data[propertyName];
    if(!!propertyValue) {
      switch(propertyName) {
        case 'factorType':
          this.setFactorType(propertyValue);
          break;

        case 'latency':
          this.setLatency(propertyValue);
          break;

        case 'impact':
          this.setImpact(propertyValue);
          break;

        case 'timeUnit':
          this.setTimeUnit(propertyValue);
          break;

        case 'priority':
          this.setPriority(propertyValue);
          break;

        case 'values':
          this.setValues(propertyValue);
          break;
      }
    }
  }
}

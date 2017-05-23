function createFilter_Special(specifics) {
  var filter = {};

  for(var property in specifics) {
    switch (property) {
      case 'calculatedInfluence':
        break;
      case 'addLatency':
        break;
      case 'calcPriceChange':
        break;
      case 'calculateDifference':
        break;
      case 'calculateImpactValue':
        break;
    }
  }
  return {
    //variables:
    factor: {}, //Data for the factor.
    calcInfluence: [], //Change of the IPH for the factor.

    //methods:
    addFactor: addFactor,
    calculatedInfluence: calculatedInfluence,
    addLatency: addLatency,
    calcPriceChange: calcPriceChange,
    calculateDifference: calculateDifference,
    calculateImpactValue: calculateImpactValue,
  };
}

function createLatency(type) {
  switch (type) {
    case 'normal':
      return  'addLatency';
    case 'linear':
      return 'addLatency_linear';
  }
}

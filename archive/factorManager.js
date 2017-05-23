function createFactorManager() {
  return {
    //variables:
    factorsData: [],

    //methods:
    buildFactorsData: buildFactorsData,
    extractValues: extractValues
  };
}

function buildFactorsData(data) {
  for(var factorName in data) {
    var factor = createFactor();
    factor.implenmentFactor(data[factorName]);

    var extractedValues = this.extractValues(factorName);
    factor.setValues(extractedValues);

    this.factorsData.push(factor);
  }
}

/*
 * @param
 * name {String} the name of the indicator.
 *
 * @return
 * result {Array} the extracted values.
 */
function extractValues(name) {
  var value = 0;
  var result = [];
  for(var index in factorsIndicators[name]) {
    var num = factorsIndicators[name][index].priceIndex;
    value = parseFloat(num);
    result.push(value);
  }

  return result;
}

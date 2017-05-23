function createFilterManager() {
  return {
    //variables:
    filters: [],

    //methods:
    buildFilters: buildFilters,
    sortFilters: sortFilters,
    getMaxPeriod: getMaxPeriod,
    applyFilters: applyFilters,
    buildPrognose: buildPrognose
  };
}
var filters = [];

function buildFilters(factors) {
  var self = this;

  Array.prototype.forEach.call(factors, function(factor, index) {
    var filter = createFilter();

    filter.addFactor(factor);
    filter.calculatedInfluence();
    filter.addLatency();

    self.filters.push(filter);
  });

  sortFilters();
}

function sortFilters() {
  this.filters.sort(function(a, b) {
    return a.factor.priority - b.factor.priority;
  });
}

function getMaxPeriod() {
  var result = 0;
  Array.prototype.forEach.call(this.filters, function(filter, index) {
    var maxLength = filter.calcInfluence.length;
    if(result < maxLength) {
      result = maxLength;
    }
  });

  return result;
}

//Need to get max period!!!
function applyFilters(period, priceIndexes) {
  var newPriceChange = 0;
  var maxPeriod = this.getMaxPeriod();

  Array.prototype.forEach.call(this.filters, function(filter, index) {
    if(period in filter.calcInfluence) {
      newPriceChange += filter.calcPriceChange(priceIndexes[period], period);
    }
  });

  var newPrice = newPriceChange + priceIndexes[period];
  priceIndexes.push(newPrice);
}

function buildPrognose(basicPrice) {
  var self = this;
  var maxPeriod = this.getMaxPeriod();
  var priceIndexes = [];
  var prognosis = [];
  priceIndexes.push(basicPrice);

  for(var i = 0; i < maxPeriod; i++) {
    self.applyFilters(i, priceIndexes);
  }

  for(var i = 0; i < priceIndexes.length; i++) {
    var element = {
      "period": i + 1,
      "priceIndex": priceIndexes[i]
    };
    prognosis.push(element);
  }

  return prognosis;
}

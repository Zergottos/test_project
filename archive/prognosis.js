var basePrice = {
  "period": "11.2008",
  "priceIndex": 82.2
};

var factorsDescription = {
  gdp: {
    values: [],
    impact: 100,
    latency: 3,
    factorType: 'normal'
  },

  unemployment: {
    values: [],
    impact: -50,
    latency: 1,
    factorType: 'normal'
  },
};

var factorsData = [];
var filters = [];
var prognosis = [];

function buildPrognosis() {
  if(!!prognosis) {
    prognosis.push({
      "period": basePrice.period,
      "priceIndex": basePrice.priceIndex
    });
  }

  var factorPool = createFactorManager();
  factorPool.buildFactorsData(factorsDescription);

  var filterPool = createFilterManager();
  filterPool.buildFilters(factorPool.factorsData);
  filterPool.sortFilters();

  prognosis = filterPool.buildPrognose(basePrice.priceIndex);
}

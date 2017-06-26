function View () {
	// :properties
	this.x = 0;
	this.y = 0;
	this.data = {};
	this.chart = new AmCharts.AmStockChart();

	var panelsSettings = new AmCharts.PanelsSettings();
	panelsSettings.svgIcon = false;
	this.chart.panelsSettings = panelsSettings;

	var categoryAxesSettings = new AmCharts.CategoryAxesSettings();
	categoryAxesSettings.minPeriod = "YYYY";
	categoryAxesSettings.maxSeries = 10;
	this.chart.categoryAxesSettings = categoryAxesSettings;

	var chartScrollbarSettings = new AmCharts.ChartScrollbarSettings();
	chartScrollbarSettings.enabled = false;
	this.chart.chartScrollbarSettings = chartScrollbarSettings;

	var periodSelector = new AmCharts.PeriodSelector();
	periodSelector.width = 40;
	this.chart.periodSelector = periodSelector;

	var stockPanel = new AmCharts.StockPanel();
	this.chart.panels = [stockPanel];

	// :methods
	this.initDataSet = function(data, _category) {
		// get the first property from the data as categoryField
		var category = _category || 'date';

		this.data = data;
		
		var dataSet = new AmCharts.DataSet();
		dataSet.dataProvider = data;
		dataSet.categoryField = category;

		var index = 0;
		for(var prop in dataSet.dataProvider[0]) {
			if(prop === dataSet.categoryField) {
				continue;
			}
			dataSet.fieldMappings.push({
				fromField: prop,
				toField: 'value_' + index++
			});
		}

		this.chart.dataSets = [dataSet];
	};

	this.initGraphs = function() {
		var stockPanel = this.chart.panels[0] || null;

		// Error handling: stockPanel not initialized
		if(stockPanel === null) {
			return;
		}

		var fieldName;
		for(var prop in this.chart.dataSets[0].fieldMappings) {
			fieldName = this.chart.dataSets[0].fieldMappings[prop].toField;
			this.addGraph(fieldName);
		}
	};

	this.addGraph = function(fieldName) {
		var graph = new AmCharts.StockGraph();
		graph.valueField = fieldName;
		graph.type = 'line';
		graph.title = 'Graph_' + fieldName;
		graph.fillAlphas = 0;
		graph.lineColor = '#43D400';
		graph.useDataSetColors = false;
		stockPanel.addStockGraph(graph);
	};

	this.writeChart = function(name) {
		this.chart.write(name);
	}
	this.getInfo = function() {
		return this;
	};
}
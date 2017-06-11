function View () {
	// :properties
	this.x = 0;
	this.y = 0;
	this.data = {};
	this.chart = new AmCharts.AmStockChart();

	var stockPanel = new AmCharts.StockPanel();
	this.chart.panels = [stockPanel];

	// :methods
	this.initDataSet = function(data) {
		this.data = data;
		var dataSet = new AmCharts.DataSet();
		dataSet.dataProvider = data;
		dataSet.fieldMappings = [
			{fromField:'val1', toField:'value1'},
			{fromField:'val', toField:'value'},
		];
		dataSet.categoryField = 'date';
		this.chart.dataSets = [dataSet];
	};

	this.initGraphs = function() {
		var stockPanel = this.chart.panels[0] || null;

		// Error handling: stockPanel not initialized
		if(stockPanel === null) {
			return;
		}

		var graph = new AmCharts.StockGraph();
		graph.valueField = 'value';
		graph.type = 'line';
		graph.title = 'MyGraph';
		graph.fillAlphas = 0;
		graph.lineColor = '#43D400';
		graph.useDataSetColors = false;
		stockPanel.addStockGraph(graph);

		var graph1 = new AmCharts.StockGraph();
		graph1.valueField = 'value1';
		graph1.type = 'line';
		graph1.title = 'MyGraph1';
		graph1.fillAlphas = 0;
		graph1.lineColor = '#D40000';
		graph1.useDataSetColors = false;
		stockPanel.addStockGraph(graph1);
	};

	this.writeChart = function(name) {
		this.chart.write(name);
	}
	this.getInfo = function() {
		return this;
	};
}
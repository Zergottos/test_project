AmCharts.ready(function(){
	var chart = new AmCharts.AmStockChart();
	// chart.pathToImages = "amcharts/images/";

	var dataSet = new AmCharts.DataSet();
	dataSet.dataProvider = chartData;
	dataSet.fieldMappings = [
		{fromField:"val1", toField:"value1"},
		{fromField:"val", toField:"value"},
	];
	dataSet.categoryField = "date";
	chart.dataSets = [dataSet];

	var stockPanel = new AmCharts.StockPanel();
	chart.panels = [stockPanel];

	// var legend = new AmCharts.StockLegend();
	// stockPanel.stockLegend = legend;

	var panelsSettings = new AmCharts.PanelsSettings();
	panelsSettings.startDuration = 0;
	chart.panelsSettings = panelsSettings;

	var graph = new AmCharts.StockGraph();
	graph.valueField = "value";
	graph.type = "line";
	graph.title = "MyGraph";
	graph.fillAlphas = 0;
	graph.lineColor = "#43D400";
	graph.useDataSetColors = false;
	stockPanel.addStockGraph(graph);

	var graph1 = new AmCharts.StockGraph();
	graph1.valueField = "value1";
	graph1.type = "line";
	graph1.title = "MyGraph1";
	graph1.fillAlphas = 0;
	graph1.lineColor = "#D40000";
	graph1.useDataSetColors = false;
	stockPanel.addStockGraph(graph1);

	var categoryAxesSettings = new AmCharts.CategoryAxesSettings();
	categoryAxesSettings.dashLength = 10;
	chart.categoryAxesSettings = categoryAxesSettings;

	var valueAxesSettings = new AmCharts.ValueAxesSettings();
	valueAxesSettings.dashLength = 10;
	chart.valueAxesSettings  = valueAxesSettings;

	var chartScrollbarSettings = new AmCharts.ChartScrollbarSettings();
	chartScrollbarSettings.graph = graph;
	chartScrollbarSettings.graphType = "line";
	// chart.chartScrollbarSettings = chartScrollbarSettings;

	var chartCursorSettings = new AmCharts.ChartCursorSettings();
	chartCursorSettings.valueBalloonsEnabled = true;
	// chart.chartCursorSettings = chartCursorSettings;

	var periodSelector = new AmCharts.PeriodSelector();
	periodSelector.periods = [{period:"DD", count:1, label:"1 day"},
							  {period:"DD", selected:true, count:5, label:"5 days"},
							  {period:"MM", count:1, label:"1 month"},
							  {period:"YYYY", count:1, label:"1 year"},
							  {period:"YTD", label:"YTD"},
							  {period:"MAX", label:"MAX"}];
	// chart.periodSelector = periodSelector;

	// chart.write("chart");
});

var chartData= [
	{date: new Date(2011, 5, 1, 0, 0, 0, 0), val:10, val1: 10},
	{date: new Date(2011, 5, 2, 0, 0, 0, 0), val:11, val1: 11},
	{date: new Date(2011, 5, 3, 0, 0, 0, 0), val:12, val1: 13},
	{date: new Date(2011, 5, 4, 0, 0, 0, 0), val:11, val1: 10},
	{date: new Date(2011, 5, 5, 0, 0, 0, 0), val:10, val1: 12},
	{date: new Date(2011, 5, 6, 0, 0, 0, 0), val:11, val1: 10},
	{date: new Date(2011, 5, 7, 0, 0, 0, 0), val:13, val1: 11},
	{date: new Date(2011, 5, 8, 0, 0, 0, 0), val:14, val1: 14},
	{date: new Date(2011, 5, 9, 0, 0, 0, 0), val:17, val1: 10},
	{date: new Date(2011, 5, 10, 0, 0, 0, 0), val:13, val1: 11}
];

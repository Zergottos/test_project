AmCharts.ready(function() {

	buildPrognosis();

	var chart1 = new AmCharts.AmSerialChart();
	//chart.dataProvider = prognosis; //The variable with the data from chart.js (JSON file)
	chart1.dataProvider = prognosis;
  chart1.categoryField = "period";

	var categoryAxis1 = chart1.categoryAxis;
	categoryAxis1.autoGridCount  = false; //The number of categories (auto)
	categoryAxis1.gridCount = prognosis.length; //The number of categories (manual)
	categoryAxis1.gridPosition = "start";
	categoryAxis1.labelRotation = 45;

	var graph1 = new AmCharts.AmGraph();
	graph1.valueField = "priceIndex";
	graph1.type = "line";
	graph1.fillAlphas = 0.5;
	graph1.bullet = "round";
	graph1.lineColor = "#8d1cc6";

	chart1.addGraph(graph1);

	chart1.write('chartdiv');

});

function init() {
}

function getData() {
  var inputData = document.getElementById("inputField").value;
  var rowsData = inputData.split('<<<');
  var period = splitData(rowsData[0]);
  var indexData = splitData(rowsData[1]);
  var tableData = [];

  for(i = 0; i < indexData.length; i++) {
    var element = {
      //period: (i+1),
      priceIndex: indexData[i]
    };

    tableData.push(element);
  }
  //TO BE implemented!
  for(var i = 0; i < period.length; i++) {
    tableData[i].period = period[i];
  }

  console.log('Data: ');

  for(i = 0; i < tableData.length; i++) {
    console.log('{ \n' + 'period: \"' +  tableData[i].period + '\", \n' +
      'priceIndex: \"' + tableData[i].priceIndex + '\" \n' + '}, \n');
  }
}

function splitData(data) {
  var result = [];
  var element = '';
  var letterNumber = /^[0-9a-zA-Z]+$/;

  for(var i = 0; i < data.length; i++) {
    if(data[i].match(letterNumber) || data[i] === ',') {
      element += data[i];
    } else {
      if(element !== '') {
        result.push(element);
        element = '';
      }
    }
  }

  return result;
}

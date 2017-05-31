/*global angular*/
/*global google*/
angular
    .module("sos09-app")
    .controller("MineController", ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams) {
        console.log("Mine Controller INIT OK");
        var finalData1 = [];
          var finalData2 = [];
           var finalData3 = [];
        
        
      
      
           $http                                       
        .get("/api/v2/ticsathome-stats/2016" +"?apikey=ticsathomeLuis")
        .then(function(response){
        response.data.forEach(function(item) {
                    finalData1.push(Number(item.smartphone));
                    finalData2.push(Number(item.tablet));
                    finalData3.push(item.country);
                });
                
        
        
        var myConfig = {
  
  "type": "bar",
  "scale-x": {
    "labels": finalData3
  },
  "series": [
    {
      "values":finalData1
    },
    {
      "values":finalData2
    }
  ]

};
 
zingchart.render({ 
	id : 'myChart', 
	data : myConfig, 
	height: 400, 
	width: "100%" 
});
        
    /*  google.charts.load('current',{
          'packages':['geochart'],
          'mapsApiKey':"AIzaSyCXG8oC2k-nM18JMXiW0asnu6UJ8wLYCVA"
          
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
           var finalData =[
               ['Country', 'Smartphone','Tablet']
               ];
          
        
           response.data.forEach(function(item) {
                    finalData.push([item.country, Number(item.smartphone), Number(item.tablet)]);
                });
                
            
            var data = google.visualization.arrayToDataTable(finalData);
    console.log(data);

        var options = {
            datalessRegionColor:'lightgreen',
            backgroundColor: '#81BEF7',
                    region:150,
                   // displayMode: 'markers',
                    colorAxis: {
                        colors: ['#FFFF00', '#FF0000']
                    },
                    resolution: 'countries'
                };

        var chart = new google.visualization.GeoChart(document.getElementById('map'));

        chart.draw(data, options);
      }*/
        });
    }]);
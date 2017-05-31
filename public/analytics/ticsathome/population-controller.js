/*global angular*/
/*global google*/
angular
    .module("sos09-app")
    .controller("PopulationController", ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams) {
        console.log("Population Controller INIT OK");
        var paisesW = [];
        
         var paisesTotal =[
               ['Country', 'Population','Smartphone']
               ];
          $http                                       
        .get("https://restcountries.eu/rest/v2/all")
        .then(function(response){
        	paisesW = response.data;
        	
        console.log(response.data);
           
        });
        
         $http                                       
        .get("api/v3/ticsathome-stats/")
        .then(function(response){
        	
      
      for(var i = 0;i<response.data.length;i++){
      	for(var j = 0;j<paisesW.length;j++){
      		if(response.data[i].country == paisesW[j].name.toLowerCase()){
      			paisesTotal.push([response.data[i].country,paisesW[j].population,response.data[i].smartphone]);
      		}
      		
      	}
      }
      console.log(paisesTotal);
       google.charts.load('current',{
          'packages':['geochart'],
          'mapsApiKey':"AIzaSyCXG8oC2k-nM18JMXiW0asnu6UJ8wLYCVA"
          
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
                
               
                
                
            
            var data = google.visualization.arrayToDataTable(paisesTotal);
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
      }
        });
      
      
        
        
    }]);
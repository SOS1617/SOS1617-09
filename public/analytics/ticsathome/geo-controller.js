/*global angular*/
/*global google*/
angular
    .module("sos09-app")
    .controller("GeoController", ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams) {
        console.log("Geo Controller INIT OK");
        
        
           $http                                       
        .get("/api/v2/ticsathome-stats/2016" +"?apikey=ticsathomeLuis")
        .then(function(response){
        
        
      google.charts.load('current',{
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
                
            /*foreach(var i =0;i<response.data.length;i++){
               var serverData = response.data[i];
                var item = [serverData.country,serverData.smartphone];
                
                
                finalData.push(item);
                
                
                
                
            }*/
            var data = google.visualization.arrayToDataTable(finalData);
    console.log(data)

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
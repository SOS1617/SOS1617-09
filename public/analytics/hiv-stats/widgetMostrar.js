/*global angular*/
/*global google*/
angular
    .module("sos09-app")
    .controller("HivGeoController", ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams) {
        console.log("HIV Geo Controller it's okey");



 $http                                       
        .get("/api/v2/hiv-stats" +"?apikey=manuel")
        .then(function(response){
        


      google.charts.load('current',{
          'packages':['geochart'],
          'mapsApiKey':"AIzaSyC295DYfJVrhLoyciOSrVhTlKTB623SBp0"
        // 'mapsApiKey':"AIzaSyCXG8oC2k-nM18JMXiW0asnu6UJ8wLYCVA"
      });
    
      google.charts.setOnLoadCallback(drawRegionsMap);

                function drawRegionsMap() {

                    var Datalist= [ 
                        ['Country','Total','Percentage']
                    ];
                    response.data.forEach(function(oneData) {
                        Datalist.push([oneData.country, Number(oneData.total), Number(oneData.percentage)]);
                    });

                    var data = google.visualization.arrayToDataTable(Datalist);

                    var options = {
                        region: 150,
                        //CONSULTAR: https://developers.google.com/chart/interactive/docs/gallery/geochart
                        //displayMode: 'markers',
                        colorAxis: {
                            colors: ['green', 'red']
                        }
                        
                    };

                    var chart = new google.visualization.GeoChart(
                        document.getElementById('regions_div'));

                    chart.draw(data, options);
      
                }
        });
}]);
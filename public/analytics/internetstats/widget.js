/*global angular*/
/*global google*/
angular
    .module("sos09-app")
    .controller("InternetStatsWidgets", ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams) {
        console.log("Controller initialized");
        $http
            .get("/api/v2/internetandphones-stats" + "?apikey=internetstats")
            .then(function(response) {


                google.charts.load('current', {
                    'packages': ['geochart'],
                    'mapsApiKey': "AIzaSyCXG8oC2k-nM18JMXiW0asnu6UJ8wLYCVA"

                });
                google.charts.setOnLoadCallback(drawRegionsMap);

                function drawRegionsMap() {
                    var finalData = [
                        ['Country', 'UsageInternet', 'UsagePhoneline']
                    ];

                    console.log(response.data);
                    response.data.forEach(function(item) {
                        finalData.push([item.country, Number(item.usageinternet), Number(item.usagephoneline)]);
                    });


                    var data = google.visualization.arrayToDataTable(finalData);
                    console.log(data);

                    var options = {
                        region: '150',
                       
                        colorAxis: {
                            colors: ['#58ACFA', '#B40431']
                        }
                     };


                    var chart = new google.visualization.GeoChart(document.getElementById('InternetStatsWidgets'));

                    chart.draw(data, options);
                }
            });

    }]);

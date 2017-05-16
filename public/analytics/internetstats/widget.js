/*global angular*/
/*global google*/
/*global Highcharts*/
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

                        var country = [];

                        var usageinternet = [];

                        var usagephoneline = [];

                        response.data.forEach((x) => {
                                country.push(x.country);
                                usageinternet.push(x.usageinternet);
                                usagephoneline.push(x.usagephoneline);
                            });
                            
                            Highcharts.chart('container', {
                                chart: {
                                    type: 'area',
                                    spacingBottom: 30
                                },
                                title: {
                                    text: 'Internet and Phonelines Stats'
                                },
                                
                                legend: {
                                    layout: 'vertical',
                                    align: 'left',
                                    verticalAlign: 'top',
                                    x: 150,
                                    y: 100,
                                    floating: true,
                                    borderWidth: 1,
                                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                                },
                                xAxis: {
                                    categories: country
                                    
                                },
                                yAxis: {
                                    title: {
                                        text: 'Usage %'
                                    },
                                    labels: {
                                        formatter: function() {
                                            return this.value;
                                        }
                                    }
                                },
                                tooltip: {
                                    formatter: function() {
                                        return '<b>' + this.series.name + '</b><br/>' +
                                            this.x + ': ' + this.y;
                                    }
                                },
                                plotOptions: {
                                    area: {
                                        fillOpacity: 0.5
                                    }
                                },
                                credits: {
                                    enabled: false
                                },
                                series: [{
                                    name: 'UsageInternet',
                                    data: usageinternet
                                }, {
                                    name: 'UsagePhoneline',
                                    data: usagephoneline
                                }]
                            });
                        });
              

    }]);

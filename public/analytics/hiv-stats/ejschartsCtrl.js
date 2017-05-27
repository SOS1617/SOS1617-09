/*global angular*/
/*global Highcharts*/
/*global EJSC*/
/*global google*/

angular
    .module("sos09-app")
    .controller("EJSChartsController", ["$scope", "$http", function($scope, $http) {


        $scope.apikey = "manuel";
        $scope.country = [];
        $scope.year = [];
        $scope.incidence = [];
        $scope.total = [];
        $scope.percentage = [];
        $scope.data = {};
        var data = {};
        $scope.url = "/api/v2/hiv-stats";



        $http
            .get($scope.url + "?apikey=manuel").then(function(response) {

                data = response.data;
                $scope.data = data;
                //data.sort(sort_by('province', true, parseInt));

                for (var i = 0; i < data.length; i++) {
                    $scope.country.push($scope.data[i].country);
                    $scope.year.push(Number($scope.data[i].year));
                    $scope.incidence.push(Number($scope.data[i].incidence));
                    $scope.total.push(Number($scope.data[i].total));
                    $scope.percentage.push(Number($scope.data[i].percentage));

                    console.log($scope.data[i].country);
                }

                console.log("Controller intialized");



                //Highcharts

                Highcharts.chart('hivHigchart', {
                    chart: {
                        zoomType: 'xy'
                    },
                    title: {
                        text: 'HIV incedences and HIV total compare'
                    },
                    subtitle: {
                        text: 'Source: http://elpais.com/elpais/2014/11/27/ciencia/1417049192_049421.html'
                    },
                    xAxis: [{
                        categories: $scope.country,
                        crosshair: true
                    }],
                    yAxis: [{ // Primary yAxis
                        labels: {
                            format: '{value} ',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        title: {
                            text: 'Total',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        }
                    }, { // Secondary yAxis
                        title: {
                            text: 'Incidences',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        labels: {
                            format: '{value} ',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        opposite: true
                    }],
                    tooltip: {
                        shared: true
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'left',
                        x: 120,
                        verticalAlign: 'top',
                        y: 100,
                        floating: true,
                        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                    },
                    series: [{
                        name: 'Year 2016 Incidences',
                        type: 'column',
                        yAxis: 1,
                        data: $scope.incidence,


                    }, {
                        name: 'HIV Total',
                        type: 'spline',
                        data: $scope.total,

                    }]
                });




                //Geocharts
                google.charts.load('current', {
                    'mapsApiKey': 'AIzaSyDft-LAnK-6P_m7RTRsbV7-oCLjEYe9ITU',
                    'packages': ['geochart']
                });
                google.charts.setOnLoadCallback(drawRegionsMap);

                function drawRegionsMap() {

                    var myData = [ //no tienen que estar todos los campos
                        ['Country', 'Incidence', 'Year']
                    ];
                    response.data.forEach(function(d) {
                        myData.push([d.country, Number(d.incidence), Number(d.year)]);
                    });

                    var data = google
                        .visualization
                        .arrayToDataTable(myData);

                    var options = {
                        region: 150,
                        //CONSULTAR: https://developers.google.com/chart/interactive/docs/gallery/geochart
                        //displayMode: 'markers',
                        colorAxis: {
                            colors: ['blue', 'purple']
                        }
                    };

                    var chart = new google.visualization.GeoChart(
                        document.getElementById('googleMap'));

                    chart.draw(data, options);
                }

                //EJSCharts

                var chart = new EJSC.Chart("individualChart", {
                    show_legend: true,
                    title: 'HIV Incidences',
                    axis_bottom: { caption: "Incidences" , crosshair: { show: true } } ,
                    axis_left: { caption: "Country" , crosshair: { show: false } } ,
                    
                });

                var mySeries = new EJSC.BarSeries(

                    new EJSC.ArrayDataHandler([

                        [$scope.incidence[0], $scope.country[0]],
                        [$scope.incidence[1], $scope.country[1]],
                        [$scope.incidence[2], $scope.country[2]],
                        [$scope.incidence[3], $scope.country[3]],
                        [$scope.incidence[4], $scope.country[4]],
                        [$scope.incidence[5], $scope.country[5]]
                    ]), {
                        orientation: "horizontal",
                        intervalOffset: 0.5,
                        useColorArray: true,
                        title: "HIV Data"
                    }
                );

                mySeries.x_axis_formatter = new EJSC.NumberFormatter({
                    forced_decimals: 2
                });

                mySeries.y_axis_formatter = new EJSC.NumberFormatter({
                    forced_decimals: 2 ,
                    title: "incidences"
                });

                chart.addSeries(mySeries);


            });
    }]);
